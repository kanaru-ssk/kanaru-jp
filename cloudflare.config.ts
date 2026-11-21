import { defineConfig } from "cf/config";

export default defineConfig({
	worker: {
		name: "kanaru-jp",
		compatibilityDate: "2026-10-30",
		entrypoint: "./src/index.tsx",
	},
});
