import { CAREER_START_DATE } from "./constant";
import { getDiffYear } from "./date";
import { getDictionary, type Lang } from "./lang";

export type Meta = {
	lang: Lang;
	title: string;
	descriptions: string[];
	noindex?: boolean;
};

export function getMeta(lang: Lang): Meta {
	const yearOfExperience = getDiffYear(CAREER_START_DATE, new Date());
	return { lang, ...getDictionary(lang, yearOfExperience) };
}
