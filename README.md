# kanaru-jp

My personal website

## Public URL

[kanaru.jp](https://kanaru.jp)

## Tech

Based on the [@cloudensis/create-hono](https://github.com/cloudensis/create-hono) template.

- [Hono](https://hono.dev/) (`hono/jsx`, `hono/ssg`)
- [Vite](https://vite.dev/) + [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/)
- [TypeScript](https://www.typescriptlang.org/)
- [Biome](https://biomejs.dev/)
- [Vitest](https://vitest.dev/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) (`cf` CLI)
- [GitHub Actions](https://github.com/features/actions)

## Development

| Command             | Description      |
| ------------------- | ---------------- |
| `npm run dev`       | Start dev server |
| `npm run build`     | Build and SSG    |
| `npm test`          | Test             |
| `npm run lint`      | Lint             |
| `npm run format`    | Format           |
| `npm run typecheck` | Type check       |

## Routing

`index.ts` / `index.tsx` under `src/routes` become routes. Export handlers named after HTTP methods (`GET`, `POST`, ...).

| File                          | Path           |
| ----------------------------- | -------------- |
| `routes/index.tsx`            | `/`            |
| `routes/en/index.tsx`         | `/en`          |
| `routes/ja/index.tsx`         | `/ja`          |
| `routes/sitemap.xml/index.ts` | `/sitemap.xml` |

Routes that export `ssg = true` are written to static assets by `npm run build` (`scripts/ssg.mjs`). Other requests, including 404s, are handled by the Worker.

## Deploy

Publishing a GitHub Release deploys to Cloudflare Workers via `.github/workflows/deploy.yaml`. Set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the repository secrets.
