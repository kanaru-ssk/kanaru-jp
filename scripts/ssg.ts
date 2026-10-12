/* vite build でビルドしたアプリから HTML を dist/ に書き出し、アプリは消す。 */
import fs from "node:fs/promises";
import type { Hono } from "hono";
import { type SSGPlugin, toSSG } from "hono/ssg";

/* ビルド前の型チェックでも通るよう、パスを変数にして読み込む。 */
const appPath = "../dist-server/index.js";
const app: Hono = (await import(appPath)).default;

/* 200 以外のページは書き出さずに黙って飛ばされるため、ビルドを失敗させる。 */
const failOnErrorPlugin: SSGPlugin = {
  afterResponseHook: (res) => {
    if (!res.ok) {
      throw new Error(`HTML の書き出しに失敗しました: ${res.status}`);
    }
    return res;
  },
};

const result = await toSSG(app, fs, {
  dir: "dist",
  plugins: [failOnErrorPlugin],
});
if (!result.success) {
  throw result.error;
}

/* Workers Static Assets は、見つからない URL に 404.html を返す。 */
const notFound = await app.request("/404");
await fs.writeFile("dist/404.html", await notFound.text());

await fs.rm("dist-server", { recursive: true });
