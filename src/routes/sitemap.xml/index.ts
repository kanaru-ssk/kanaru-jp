import { defineHandler } from "hono/factory";
import { BASE_URL } from "../../lib/constant";

const ssg = true;

const urls = [
	{ path: "/", hreflang: "en" },
	{ path: "/en", hreflang: "en" },
	{ path: "/ja", hreflang: "ja" },
];

const GET = defineHandler((c) => {
	const lastmod = new Date().toISOString();
	const alternates = urls
		.map(
			({ path, hreflang }) =>
				`<xhtml:link href="${BASE_URL}${path}" hreflang="${hreflang}" rel="alternate"/>`,
		)
		.join("");
	const entries = urls
		.map(
			({ path }) =>
				`<url><loc>${BASE_URL}${path}</loc><lastmod>${lastmod}</lastmod>${alternates}</url>`,
		)
		.join("");

	return c.body(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries}</urlset>`,
		200,
		{ "Content-Type": "application/xml" },
	);
});

export { GET, ssg };
