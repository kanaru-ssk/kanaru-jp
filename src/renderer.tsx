import { jsxRenderer } from "hono/jsx-renderer";
import { Link, ViteClient } from "vite-ssr-components/hono";
import { Logo } from "./components/logo";
import { BASE_URL, EMAIL, SOCIAL_LINKS } from "./lib/constant";
import { DEFAULT_LANG, getLangPath, LANGS, LOCALE } from "./lib/lang";
import type { Meta } from "./lib/meta";
import { getLangUrl } from "./lib/url";

type Render = (content: string | Promise<string>, meta: Meta) => Response;

declare module "hono" {
	interface ContextRenderer extends Render {}
}

/** `</script>` などで script 要素から抜けられないよう `<` をエスケープする */
const toJsonLd = (value: unknown): string =>
	JSON.stringify(value).replace(/</g, "\\u003c");

export const renderer = jsxRenderer(
	({ children, lang, title, description, noindex }) => {
		const canonicalUrl = getLangUrl(lang);
		const currentYear = new Date().getFullYear();
		const avatarUrl = `${BASE_URL}/avatar.webp`;
		const ogImageUrl = `${BASE_URL}/ogp.png`;

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

					{!noindex && (
						<>
							<link rel="canonical" href={canonicalUrl} />
							{LANGS.map((l) => (
								<link rel="alternate" hreflang={l} href={getLangUrl(l)} />
							))}
							<link
								rel="alternate"
								hreflang="x-default"
								href={getLangUrl(DEFAULT_LANG)}
							/>
						</>
					)}

					<title>{title}</title>
					<meta name="description" content={description} />
					<meta property="og:title" content={title} />
					<meta property="og:site_name" content={title} />
					<meta property="og:description" content={description} />
					<meta property="og:image" content={ogImageUrl} />
					<meta property="og:image:width" content="1200" />
					<meta property="og:image:height" content="630" />
					{!noindex && <meta property="og:url" content={canonicalUrl} />}
					<meta property="og:type" content="website" />
					<meta property="og:locale" content={LOCALE[lang]} />
					{LANGS.filter((l) => l !== lang).map((l) => (
						<meta property="og:locale:alternate" content={LOCALE[l]} />
					))}
					<meta name="twitter:title" content={title} />
					<meta name="twitter:description" content={description} />
					<meta name="twitter:image" content={ogImageUrl} />
					<meta name="twitter:card" content="summary_large_image" />
					{noindex && <meta name="robots" content="noindex, nofollow" />}

					<link rel="sitemap" href="/sitemap.xml" />

					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }}
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
									<a href={getLangPath(l)} hreflang={l}>
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
