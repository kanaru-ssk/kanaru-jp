# kanaru-jp

My personal website

## Public URL

[kanaru.jp](https://kanaru.jp)

## Tech

- [Hono](https://hono.dev/) (`hono/jsx`)
- [Vite](https://vite.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Biome](https://biomejs.dev/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) (Assets)
- [GitHub Actions](https://github.com/features/actions)

## Development

```sh
npm install
npm run dev        # Vite dev server
npm run lint       # Biome
npm run format     # Biome (write)
npm run typecheck  # tsc
npm run build      # Build static site into dist/
npm run preview    # Build and serve dist/ with wrangler dev
```

`npm run build` bundles the Hono app with `vite build`, then writes every page to `dist/` as HTML with `hono/ssg` (`scripts/ssg.ts`).

Publishing a GitHub Release deploys `dist/` to Cloudflare Workers Static Assets via GitHub Actions.
