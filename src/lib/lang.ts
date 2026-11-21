export const LANG = {
	ENGLISH: "en",
	JAPANESE: "ja",
} as const;
export const LANGS = Object.values(LANG);
export const DEFAULT_LANG = LANG.ENGLISH;
export type Lang = (typeof LANGS)[number];

export function getDictionary(lang: Lang, yearOfExperience: number) {
	if (lang === LANG.JAPANESE) {
		return {
			title: "佐々木 哉瑠",
			description:
				"ソフトウェアエンジニアの佐々木 哉瑠です。主に Go、TypeScript、Hono、Next.js、Cloudflare、Google Cloud、AWS を使って開発しています。開発の相談や技術的な質問をお気軽にどうぞ。",
			descriptions: [
				"ソフトウェアエンジニアをしています。",
				`実務経験 ${yearOfExperience} 年で、主に Go、TypeScript、Hono、Next.js、Cloudflare、Google Cloud、AWS、Claude Code を使用しています。`,
				"開発の相談や技術的な質問など、お気軽に上記の LinkedIn またはメールアドレスに連絡してください。",
			],
		};
	}

	return {
		title: "Kanaru Sasaki",
		description:
			"Kanaru Sasaki is a software engineer in Japan working with Go, TypeScript, Hono, Next.js, Cloudflare, Google Cloud and AWS. Open to development inquiries.",
		descriptions: [
			"I'm a software engineer in Japan (remote).",
			`I have ${yearOfExperience} years of professional experience and primarily work with Go, TypeScript, Hono, Next.js, Cloudflare, Google Cloud, AWS, and Claude Code.`,
			"For development inquiries or technical questions, feel free to contact me via LinkedIn or the email address above.",
		],
	};
}
