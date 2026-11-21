import { jsxRenderer } from "hono/jsx-renderer";
import { Link, ViteClient } from "vite-ssr-components/hono";
import { Logo } from "./components/logo";
import { BASE_URL, EMAIL, SOCIAL_LINKS } from "./lib/constant";
import { DEFAULT_LANG, LANG, LANGS } from "./lib/lang";
import type { Meta } from "./lib/meta";

type Render = (content: string | Promise<string>, meta: Meta) => Response;

declare module "hono" {
	interface ContextRenderer extends Render {}
}

export const renderer = jsxRenderer(
	({ children, lang, title, description, noindex }) => {
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
			sameAs: SOCIAL_LINKS.map((link) => link.url),
		};

		return (
			<html lang={lang}>
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />

					<meta name="generator" content="Hono" />

					<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
					<link rel="icon" type="image/x-icon" href="/favicon.ico" />

					<Link href="/src/style.css" rel="stylesheet" />
					<ViteClient />

					<link rel="canonical" href={canonicalUrl} />
					<link rel="alternate" hreflang="en" href={BASE_URL} />
					<link rel="alternate" hreflang="ja" href={`${BASE_URL}/ja`} />
					<link rel="alternate" hreflang="x-default" href={BASE_URL} />

					<title>{title}</title>
					<meta name="description" content={description} />
					<meta property="og:title" content={title} />
					<meta property="og:site_name" content={title} />
					<meta property="og:description" content={description} />
					<meta property="og:image" content={`${BASE_URL}/ogp.png`} />
					<meta property="og:image:width" content="1200" />
					<meta property="og:image:height" content="630" />
					<meta property="og:url" content={canonicalUrl} />
					<meta property="og:type" content="website" />
					<meta
						property="og:locale"
						content={lang === LANG.JAPANESE ? "ja_JP" : "en_US"}
					/>
					<meta name="twitter:title" content={title} />
					<meta name="twitter:description" content={description} />
					<meta name="twitter:image" content={`${BASE_URL}/ogp.png`} />
					<meta name="twitter:card" content="summary_large_image" />
					{noindex && <meta name="robots" content="noindex, nofollow" />}

					<link rel="sitemap" href="/sitemap.xml" />

					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
	},
);
