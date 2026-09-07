import { describe, expect, test } from "vitest";
import { withBase } from "./url";

/**
 * Chaque test passe la base explicitement : on vérifie la fonction, pas la
 * valeur qu'`import.meta.env.BASE_URL` prend sous Vitest.
 */
describe("withBase", () => {
	test("préfixe un chemin par la base du site", () => {
		expect(withBase("/cours/ma-sequence", "/mon-site/")).toBe(
			"/mon-site/cours/ma-sequence",
		);
	});

	test("ne change rien quand le site est à la racine", () => {
		expect(withBase("/cours/ma-sequence", "/")).toBe("/cours/ma-sequence");
	});

	test("ne produit jamais de double slash", () => {
		// Le cas qu'on veut vraiment couvrir : Astro renvoie une base terminée par
		// « / » et les chemins du site commencent par « / ».
		expect(withBase("/favicon.svg", "/mon-site/")).toBe(
			"/mon-site/favicon.svg",
		);
		expect(withBase("/favicon.svg", "/mon-site")).toBe("/mon-site/favicon.svg");
	});

	test("accepte un chemin sans slash initial", () => {
		expect(withBase("cours/ma-sequence", "/mon-site/")).toBe(
			"/mon-site/cours/ma-sequence",
		);
	});

	test("rend la racine du site pour un chemin vide", () => {
		expect(withBase("/", "/mon-site/")).toBe("/mon-site/");
		expect(withBase("/", "/")).toBe("/");
	});
});
