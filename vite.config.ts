import devServer from "@hono/vite-dev-server";
import { defineConfig } from "vite";
import ssrPlugin from "vite-ssr-components/plugin";

const entry = "src/index.tsx";

export default defineConfig({
  resolve: { alias: { "@/": "/src/" } },
  environments: {
    /* CSS を、配信する dist/ にビルドする。 */
    client: { build: { outDir: "dist" } },
    /*
     * HTML の書き出しに使うアプリを、配信しない dist-server/ にビルドする。
     * vite-ssr-components が本番用のパスを出せるよう、バンドルに含める。
     */
    ssr: {
      resolve: { noExternal: ["vite-ssr-components"] },
      build: { outDir: "dist-server", rollupOptions: { input: entry } },
    },
  },
  plugins: [ssrPlugin({ hotReload: { morph: false } }), devServer({ entry })],
});
