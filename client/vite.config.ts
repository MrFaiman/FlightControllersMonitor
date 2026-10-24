import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: { "/api": "http://localhost:5000" },
	},
	resolve: {
		alias: {
			"@components": fileURLToPath(new URL("./src/components", import.meta.url)),
			"@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
			"@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
		},
	},
});
