import { Hono } from "hono";
import { describe, expect, it } from "vitest";
import { registerRoutes } from "./index";

const GET = () => new Response("ok");

describe("registerRoutes", () => {
	it("ファイルからルートを登録する", async () => {
		const app = new Hono();
		registerRoutes(app, {
			"./routes/index.tsx": { GET },
			"./routes/articles/[id]/index.tsx": { GET },
		});
		expect((await app.request("/")).status).toBe(200);
		expect((await app.request("/articles/1")).status).toBe(200);
	});

	it("衝突するルートがあると例外を投げる", () => {
		expect(() =>
			registerRoutes(new Hono(), {
				"./routes/articles/[id]/index.tsx": { GET },
				"./routes/articles/[slug]/index.tsx": { GET },
			}),
		).toThrow("ルートが衝突しています");
	});

	it("動的ルートで ssg を使うのに ssgParams がないと例外を投げる", () => {
		expect(() =>
			registerRoutes(new Hono(), {
				"./routes/articles/[id]/index.tsx": { GET, ssg: true },
			}),
		).toThrow("ssgParams が必要です");
	});
});
