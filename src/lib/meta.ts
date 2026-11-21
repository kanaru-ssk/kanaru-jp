import { CAREER_START_DATE } from "./constant";
import { getDiffYear } from "./date";
import { getDictionary, type Lang } from "./lang";

export type Meta = {
	lang: Lang;
	title: string;
	/** meta description / OGP / JSON-LD 用の短い要約 */
	description: string;
	/** ページ本文の段落 */
	descriptions: string[];
	noindex?: boolean;
};

export function getMeta(lang: Lang): Meta {
	const yearOfExperience = getDiffYear(CAREER_START_DATE, new Date());
	return { lang, ...getDictionary(lang, yearOfExperience) };
}
