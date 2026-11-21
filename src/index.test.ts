import { describe, expect, it } from "vitest";
import app from "./index";

// onError の確認用。ルーターは初回リクエストで確定するため、リクエスト前に登録する
app.get("/__test-error", () => {
	throw new Error("test");
});

const html = async (path: string) => {
	const res = await app.request(path);
	return { res, body: await res.text() };
};

describe("GET /", () => {
	it("英語のトップページを返す", async () => {
		const { res, body } = await html("/");
		expect(res.status).toBe(200);
		expect(body).toContain('<html lang="en">');
		expect(body).toContain('<link rel="canonical" href="https://kanaru.jp"/>');
		expect(body).toContain(
			'<link rel="alternate" hreflang="ja" href="https://kanaru.jp/ja"/>',
		);
		expect(body).toContain(
			'<link rel="alternate" hreflang="x-default" href="https://kanaru.jp"/>',
		);
		expect(body).toContain('<meta property="og:locale" content="en_US"/>');
		expect(body).not.toContain("noindex");
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
	});
});

describe("エラーページ", () => {
	it("存在しないパスは 404 で noindex", async () => {
		const { res, body } = await html("/unknown");
		expect(res.status).toBe(404);
		expect(body).toContain('<meta name="robots" content="noindex, nofollow"/>');
		expect(body).toContain('<a href="/">Return Home</a>');
	});

	it("ハンドラーの例外は 500 で noindex", async () => {
		const { res, body } = await html("/__test-error");
		expect(res.status).toBe(500);
		expect(body).toContain('<meta name="robots" content="noindex, nofollow"/>');
	});
});
