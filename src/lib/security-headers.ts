import type { MiddlewareHandler } from "hono";

/**
 * 全レスポンス共通のセキュリティヘッダー。
 * 静的アセットには public/_headers の `/*` が、Worker のレスポンスにはこの値が付く。
 * 両者が一致していることは security-headers.test.ts で確認している。
 */
export const SECURITY_HEADERS = {
	"Content-Security-Policy": [
		"default-src 'self'",
		"script-src 'self'",
		"style-src 'self'",
		"img-src 'self'",
		"font-src 'self'",
		"connect-src 'self'",
		"object-src 'none'",
		"base-uri 'none'",
		"form-action 'none'",
		"frame-ancestors 'none'",
		"upgrade-insecure-requests",
	].join("; "),
	"X-Content-Type-Options": "nosniff",
	"X-Frame-Options": "DENY",
	"Referrer-Policy": "strict-origin-when-cross-origin",
	"Permissions-Policy": "camera=(), microphone=(), geolocation=()",
	"Strict-Transport-Security": "max-age=31536000; includeSubDomains",
} as const;

/**
 * Worker が返すレスポンス（404・500・リダイレクトなど）にセキュリティヘッダーを付ける。
 * CSP は開発時の Vite（HMR など）を妨げないよう、本番ビルドでのみ付ける。
 */
export const securityHeaders = (): MiddlewareHandler => async (c, next) => {
	await next();
	for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
		if (name === "Content-Security-Policy" && !import.meta.env.PROD) continue;
		c.res.headers.set(name, value);
	}
};
