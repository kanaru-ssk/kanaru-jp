// 各言語のトップページで共通の処理。index.{ts,tsx} 以外のファイルはルートとして登録されない
import type { Handler } from "hono";
import { HomeLayout } from "../components/home-layout";
import type { Lang } from "../lib/lang";
import { getMeta } from "../lib/meta";

export const homeHandler =
	(lang: Lang): Handler =>
	(c) => {
		const meta = getMeta(lang);
		return c.render(
			<HomeLayout descriptions={meta.descriptions} title={meta.title} />,
			meta,
		);
	};
