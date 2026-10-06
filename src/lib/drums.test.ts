import { describe, expect, it } from "vitest";
import { drums, drumsOfFigure, figureNumbers } from "@/lib/drums";

describe("drums", () => {
	it("déclare les dix codes de la documentation Strudel", () => {
		expect(drums.map((drum) => drum.code)).toEqual([
			"bd",
			"sd",
			"rim",
			"hh",
			"oh",
			"lt",
			"mt",
			"ht",
			"rd",
			"cr",
			"cp",
		]);
	});

	it("n'a pas deux fois le même code", () => {
		const codes = drums.map((drum) => drum.code);

		expect(new Set(codes).size).toBe(codes.length);
	});

	// Le piège : écrire `figure: 7` sur une pièce et obtenir une légende qui
	// renvoie à un numéro absent de l'image. Rien ne planterait à l'affichage.
	it("ne renvoie qu'à des numéros présents sur le schéma", () => {
		const used = drums
			.map((drum) => drum.figure)
			.filter((figure): figure is number => figure !== null);

		for (const figure of used) {
			expect(figureNumbers).toContain(figure);
		}
	});

	it("couvre chaque numéro du schéma par au moins un code", () => {
		for (const figure of figureNumbers) {
			expect(drumsOfFigure(figure).length).toBeGreaterThan(0);
		}
	});

	// C'est le point enseigné par la partie 1.4 : plus de codes que de pièces.
	// Un code absent du schéma doit dire pourquoi, sinon la légende laisse le
	// lecteur chercher un numéro qui n'existe pas.
	it("explique pourquoi un code n'a pas de numéro", () => {
		for (const drum of drums.filter((entry) => entry.figure === null)) {
			expect(drum.nuance, `« ${drum.code} » sans explication`).toBeTruthy();
		}
	});

	// Deux codes sur le même numéro, c'est permis — ils désignent deux façons de
	// jouer la même pièce. Mais ils doivent rester distinguables dans la légende.
	it("garde des noms distincts entre codes d'un même numéro", () => {
		for (const figure of figureNumbers) {
			const names = drumsOfFigure(figure).map((drum) => drum.french);

			expect(new Set(names).size, `doublon sur le numéro ${figure}`).toBe(
				names.length,
			);
		}
	});
});
