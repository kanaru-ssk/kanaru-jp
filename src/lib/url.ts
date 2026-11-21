import { BASE_URL } from "./constant";
import { getLangPath, type Lang } from "./lang";

/** 各言語のトップページの絶対 URL（canonical・hreflang・sitemap で共通） */
export function getLangUrl(lang: Lang): string {
	return `${BASE_URL}${getLangPath(lang)}`;
}
