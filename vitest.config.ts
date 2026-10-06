import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
	// Vitest ne lit pas les `paths` de tsconfig.json : sans ce miroir, tout
	// import en `@/` échoue sur « Cannot find package ». La convention du projet
	// (alias partout, jamais de `../..`) ne tiendrait alors plus dans les tests.
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	test: {
		coverage: {
			provider: "v8",
			include: ["src/lib/**/*.ts", "src/composables/**/*.ts"],
			reporter: ["text", "html"],
		},
	},
});
