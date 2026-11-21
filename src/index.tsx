import { Hono } from "hono";
import { trimTrailingSlash } from "hono/trailing-slash";
import { NotFoundLayout } from "./components/not-found-layout";
import { DEFAULT_LANG } from "./lib/lang";
import { getMeta } from "./lib/meta";
import { type RouteModule, registerRoutes } from "./lib/router";
import { renderer } from "./renderer";

const app = new Hono();

app.use(trimTrailingSlash({ alwaysRedirect: true }));
app.use(renderer);

registerRoutes(
	app,
	import.meta.glob<RouteModule>("./routes/**/index.{ts,tsx}", { eager: true }),
);

app.notFound((c) => {
	const meta = getMeta(DEFAULT_LANG);
	c.status(404);
	return c.render(<NotFoundLayout />, {
		...meta,
		title: `404 Not Found | ${meta.title}`,
		noindex: true,
	});
});

app.onError((err, c) => {
	console.error(err);
	const meta = getMeta(DEFAULT_LANG);
	c.status(500);
	return c.render(<h1>500 Internal Server Error</h1>, {
		...meta,
		title: `500 Internal Server Error | ${meta.title}`,
		noindex: true,
	});
});

export default app;
