import { describe, expect, it } from "vitest";
import sitemapFile from "../../public/sitemap.xml?raw";
import { buildSitemap } from "./sitemap";

describe("public/sitemap.xml", () => {
	it("LANGS から生成した内容と一致する", () => {
		expect(sitemapFile).toBe(buildSitemap());
	});
});
