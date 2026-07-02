import type { PropsWithChildren } from "hono/jsx";
import { Logo } from "@/components/Logo";
import { BASE_URL, EMAIL } from "@/lib/constant";
import { DEFAULT_LANG, LANGS, type Lang } from "@/lib/lang";

type Props = PropsWithChildren<{
  lang: Lang;
  title: string;
  descriptions: string[];
}>;

export function BaseLayout({ lang, title, descriptions, children }: Props) {
  const description = descriptions.join(" ");
  const canonicalUrl = `${BASE_URL}${lang === DEFAULT_LANG ? "" : `/${lang}`}`;
  const currentYear = new Date().getFullYear();
  const avatarUrl = `${BASE_URL}/avatar.webp`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: title,
    description,
    email: EMAIL,
    url: canonicalUrl,
    image: avatarUrl,
    sameAs: [
      "https://github.com/kanaru-ssk",
      "https://x.com/kanaru_ssk",
      "https://note.com/kanaru_ssk",
    ],
  };

  return (
    <html lang={lang}>
      <head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />

        <meta content="Hono" name="generator" />

        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/favicon.ico" rel="icon" type="image/x-icon" />

        <link href="/global.css" rel="stylesheet" />

        <link href={canonicalUrl} rel="canonical" />
        <link href={BASE_URL} hreflang="en" rel="alternate" />
        <link href={`${BASE_URL}/ja`} hreflang="ja" rel="alternate" />
        <link href={BASE_URL} hreflang="x-default" rel="alternate" />

        <title>{title}</title>
        <meta content={title} name="og:title" />
        <meta content={title} name="og:site_name" />
        <meta content={title} name="twitter:title" />
        <meta content={description} name="description" />
        <meta content={description} name="og:description" />
        <meta content={description} name="twitter:description" />
        <meta content={`${BASE_URL}/ogp.png`} name="og:image" />
        <meta content={`${BASE_URL}/ogp.png`} name="twitter:image" />
        <meta content={canonicalUrl} name="og:url" />
        <meta content="website" name="og:type" />
        <meta content="summary_large_image" name="twitter:card" />

        <link href="/sitemap.xml" rel="sitemap" />

        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </head>

      <body>
        <header>
          <Logo height={48} width={104} />
          <div class="links">
            {LANGS.map((l) =>
              lang === l ? (
                <span>{l}</span>
              ) : (
                <a href={l === DEFAULT_LANG ? "/" : `/${l}`} hreflang={l}>
                  {l}
                </a>
              ),
            )}
          </div>
        </header>

        <main>{children}</main>

        <footer>
          &copy; {currentYear} {title}
        </footer>
      </body>
    </html>
  );
}
