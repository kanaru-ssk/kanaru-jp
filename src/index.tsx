import { type Context, Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { BaseLayout } from "@/components/base-layout";
import { HomeLayout } from "@/components/home-layout";
import { NotFoundLayout } from "@/components/not-found-layout";
import { BASE_URL, CAREER_START_DATE } from "@/lib/constant";
import { getDiffYear } from "@/lib/date";
import { DEFAULT_LANG, getDictionary, LANG, type Lang } from "@/lib/lang";

declare module "hono" {
  interface ContextRenderer {
    // biome-ignore lint/style/useShorthandFunctionType: interface is required for declaration merging with hono's ContextRenderer
    (
      content: string | Promise<string>,
      props: { lang: Lang; title: string; descriptions: string[] },
    ): Response | Promise<Response>;
  }
}

const app = new Hono();

app.use(
  jsxRenderer(({ children, lang, title, descriptions }) => (
    <BaseLayout descriptions={descriptions} lang={lang} title={title}>
      {children}
    </BaseLayout>
  )),
);

function renderHome(c: Context, lang: Lang) {
  const yearOfExperience = getDiffYear(CAREER_START_DATE, new Date());
  const { title, descriptions } = getDictionary(lang, yearOfExperience);

  return c.render(<HomeLayout descriptions={descriptions} title={title} />, {
    lang,
    title,
    descriptions,
  });
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

app.get("/", (c) => renderHome(c, DEFAULT_LANG));
app.get("/en/", (c) => renderHome(c, LANG.ENGLISH));
app.get("/ja/", (c) => renderHome(c, LANG.JAPANESE));
app.get("/sitemap.xml", (c) =>
  c.body(buildSitemap(), 200, { "Content-Type": "application/xml" }),
);

app.notFound((c) => {
  const yearOfExperience = getDiffYear(CAREER_START_DATE, new Date());
  const { title, descriptions } = getDictionary(DEFAULT_LANG, yearOfExperience);

  c.status(404);
  return c.render(<NotFoundLayout />, {
    lang: DEFAULT_LANG,
    title: `404 Not Found | ${title}`,
    descriptions,
  });
});

export default app;
