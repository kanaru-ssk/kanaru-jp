import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import app from "../src/app";
import { BASE_URL } from "../src/lib/constant";

const ROOT = join(import.meta.dirname, "..");
const DIST = join(ROOT, "dist");

async function renderRoute(path: string, outFile: string) {
  const res = await app.request(path);
  const html = await res.text();
  const outPath = join(DIST, outFile);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, `<!DOCTYPE html>${html}`);
}

function buildSitemap() {
  const urls = [
    { path: "/", hreflang: "en" },
    { path: "/en/", hreflang: "en" },
    { path: "/ja/", hreflang: "ja" },
  ];
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

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries}</urlset>`;
}

async function main() {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  await cp(join(ROOT, "public"), DIST, { recursive: true });
  await cp(join(ROOT, "src/styles/global.css"), join(DIST, "global.css"));

  await renderRoute("/", "index.html");
  await renderRoute("/en", "en/index.html");
  await renderRoute("/ja", "ja/index.html");
  await renderRoute("/404", "404.html");

  await writeFile(join(DIST, "sitemap.xml"), buildSitemap());

  console.log("Build complete: dist/");
}

main();
