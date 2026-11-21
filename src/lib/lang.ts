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
			descriptions: [
				"フリーランスのソフトウェアエンジニアと、宮城大学の特任助教をしています。",
				`実務経験 ${yearOfExperience} 年目で、主にGo、TypeScript、Next.js、GoogleCloudを使用しています。`,
				"開発の相談や技術的な質問など、お気軽に上記の LinkedIn またはメールアドレスに連絡してください。",
			],
		};
	}

	return {
		title: "Kanaru Sasaki",
		descriptions: [
			"I'm a freelance software engineer in Japan (remote) and an assistant professor at Miyagi University.",
			`I have ${yearOfExperience} years of professional experience and primarily work with Go, TypeScript, Next.js, and Google Cloud.`,
			"For development inquiries or technical questions, feel free to contact me via LinkedIn or the email address above.",
		],
	};
}
