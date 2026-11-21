export const BASE_URL = "https://kanaru.jp";
export const EMAIL = "contact@kanaru.jp";
export const CAREER_START_DATE = new Date("2021-02");

export const GITHUB_URL = "https://github.com/kanaru-ssk";
export const X_URL = "https://x.com/kanaru_ssk";
export const LINKEDIN_URL = "https://www.linkedin.com/in/kanaru-ssk/";

/** 画面のリンクと JSON-LD の sameAs で共通の SNS 一覧（表示順） */
export const SOCIAL_LINKS = [
	{ label: "GitHub", url: GITHUB_URL },
	{ label: "X", url: X_URL },
	{ label: "LinkedIn", url: LINKEDIN_URL },
] as const;
