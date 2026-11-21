import { describe, expect, it } from "vitest";
import app from "./index";
import { SECURITY_HEADERS } from "./lib/security-headers";

// onError の確認用。ルーターは初回リクエストで確定するため、リクエスト前に登録する
app.get("/__test-error", () => {
	throw new Error("test");
});

const html = async (path: string) => {
	const res = await app.request(path);
	return { res, body: await res.text() };
};

// CSP はテスト（開発モード）では付けないため除外する
const { "Content-Security-Policy": _, ...headersWithoutCsp } = SECURITY_HEADERS;

const expectSecurityHeaders = (res: Response) => {
	for (const [name, value] of Object.entries(headersWithoutCsp)) {
		expect(res.headers.get(name)).toBe(value);
	}
};

describe("GET /", () => {
	it("英語のトップページを返す", async () => {
		const { res, body } = await html("/");
		expect(res.status).toBe(200);
		expect(body).toContain('<html lang="en">');
		expect(body).toContain('<link rel="canonical" href="https://kanaru.jp/"/>');
		expect(body).toContain(
			'<link rel="alternate" hreflang="ja" href="https://kanaru.jp/ja"/>',
		);
		expect(body).toContain(
			'<link rel="alternate" hreflang="x-default" href="https://kanaru.jp/"/>',
		);
		expect(body).toContain('<meta property="og:locale" content="en_US"/>');
		expect(body).toContain(
			'<meta property="og:locale:alternate" content="ja_JP"/>',
		);
		expect(body).not.toContain("noindex");
		expectSecurityHeaders(res);
	});

	it("meta description は短い要約を使う", async () => {
		const { body } = await html("/");
		const description = body.match(
			/<meta name="description" content="([^"]*)"/,
		)?.[1];
		expect(description).toBeDefined();
		expect(description?.length).toBeLessThanOrEqual(160);
		expect(description).not.toContain("above");
	});

	it("JSON-LD の sameAs は GitHub, X, LinkedIn の順", async () => {
		const { body } = await html("/");
		const json = body.match(
			/<script type="application\/ld\+json">(.*?)<\/script>/,
		)?.[1];
		expect(JSON.parse(json ?? "{}").sameAs).toEqual([
			"https://github.com/kanaru-ssk",
			"https://x.com/kanaru_ssk",
			"https://www.linkedin.com/in/kanaru-ssk/",
		]);
	});
});

describe("GET /ja", () => {
	it("日本語のトップページを返す", async () => {
		const { res, body } = await html("/ja");
		expect(res.status).toBe(200);
		expect(body).toContain('<html lang="ja">');
		expect(body).toContain(
			'<link rel="canonical" href="https://kanaru.jp/ja"/>',
		);
		expect(body).toContain('<meta property="og:locale" content="ja_JP"/>');
	});
});

describe("リダイレクト", () => {
	it.each([
		["/en", "/"],
		["/ja/", "/ja"],
	])("%s → %s", async (path, location) => {
		const res = await app.request(path);
		expect(res.status).toBe(301);
		expect(res.headers.get("location")).toMatch(new RegExp(`${location}$`));
		expectSecurityHeaders(res);
	});
});

describe("エラーページ", () => {
	it("存在しないパスは 404 で noindex", async () => {
		const { res, body } = await html("/unknown");
		expect(res.status).toBe(404);
		expect(body).toContain('<meta name="robots" content="noindex, nofollow"/>');
		expect(body).not.toContain('rel="canonical"');
		expect(body).toContain('<a href="/">Return Home</a>');
		expectSecurityHeaders(res);
	});

	it("ハンドラーの例外は 500 で noindex", async () => {
		const { res, body } = await html("/__test-error");
		expect(res.status).toBe(500);
		expect(body).toContain('<meta name="robots" content="noindex, nofollow"/>');
		expect(body).toContain('<a href="/">Return Home</a>');
		expectSecurityHeaders(res);
	});
});
