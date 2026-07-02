import fs, { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { toSSG } from "hono/ssg";
import app from "../src/app";
import { BASE_URL } from "../src/lib/constant";

const ROOT = join(import.meta.dirname, "..");
const DIST = join(ROOT, "dist");

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

async function addDoctype(files: string[]) {
  await Promise.all(
    files
      .filter((file) => file.endsWith(".html"))
      .map(async (file) => {
        const html = await readFile(file, "utf-8");
        await writeFile(file, `<!DOCTYPE html>${html}`);
      }),
  );
}

async function main() {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  await cp(join(ROOT, "public"), DIST, { recursive: true });
  await cp(join(ROOT, "src/styles/global.css"), join(DIST, "global.css"));

  const result = await toSSG(app, fs, {
    dir: DIST,
    // 404ページ(status 404)もデフォルトプラグインだと除外されるため許可する
    plugins: [
      {
        afterResponseHook: (res) =>
          res.status === 200 || res.status === 404 ? res : false,
      },
    ],
  });
  if (!result.success) {
    throw result.error;
  }
  await addDoctype(result.files);

  await writeFile(join(DIST, "sitemap.xml"), buildSitemap());

  console.log(`Build complete: dist/ (${result.files.length} pages)`);
}

main();
