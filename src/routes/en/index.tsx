import type { Handler } from "hono";

// 英語版は / が正規の URL のため、重複を避けてリダイレクトする
const GET: Handler = (c) => c.redirect("/", 301);

export { GET };
