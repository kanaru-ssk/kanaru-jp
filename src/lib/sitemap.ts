import { DEFAULT_LANG, LANGS } from "./lang";
import { getLangUrl } from "./url";

/**
 * public/sitemap.xml の内容を LANGS から生成する。
 * sitemap.xml は静的ファイルとして配信しているため、内容がずれていないかを sitemap.test.ts で確認する。
 */
export function buildSitemap(): string {
	const alternates = [
		...LANGS.map(
			(lang) =>
				`    <xhtml:link rel="alternate" hreflang="${lang}" href="${getLangUrl(lang)}"/>`,
		),
		`    <xhtml:link rel="alternate" hreflang="x-default" href="${getLangUrl(DEFAULT_LANG)}"/>`,
	];
	const urls = LANGS.map((lang) =>
		[
			"  <url>",
			`    <loc>${getLangUrl(lang)}</loc>`,
			...alternates,
			"  </url>",
		].join("\n"),
	);
	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
		...urls,
		"</urlset>",
		"",
	].join("\n");
}
