import { type Context, Hono } from "hono";
import { BaseLayout } from "@/components/BaseLayout";
import { HomeLayout } from "@/components/HomeLayout";
import { NotFoundLayout } from "@/components/NotFoundLayout";
import { CAREER_START_DATE } from "@/lib/constant";
import { getDiffYear } from "@/lib/date";
import { DEFAULT_LANG, getDictionary, LANG, type Lang } from "@/lib/lang";

const app = new Hono();

function renderHome(c: Context, lang: Lang) {
  const yearOfExperience = getDiffYear(CAREER_START_DATE, new Date());
  const { title, descriptions } = getDictionary(lang, yearOfExperience);

  return c.html(
    <BaseLayout descriptions={descriptions} lang={lang} title={title}>
      <HomeLayout descriptions={descriptions} title={title} />
    </BaseLayout>,
  );
}

function renderNotFound(c: Context) {
  const yearOfExperience = getDiffYear(CAREER_START_DATE, new Date());
  const { title, descriptions } = getDictionary(DEFAULT_LANG, yearOfExperience);

  return c.html(
    <BaseLayout
      descriptions={descriptions}
      lang={DEFAULT_LANG}
      title={`404 Not Found | ${title}`}
    >
      <NotFoundLayout />
    </BaseLayout>,
    404,
  );
}

app.get("/", (c) => renderHome(c, DEFAULT_LANG));
app.get("/en/", (c) => renderHome(c, LANG.ENGLISH));
app.get("/ja/", (c) => renderHome(c, LANG.JAPANESE));
app.get("/404", renderNotFound);

app.notFound(renderNotFound);

export default app;
