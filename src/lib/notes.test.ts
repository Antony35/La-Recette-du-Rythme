import { describe, expect, it } from "vitest";
import {
	BLACK_HEIGHT,
	blackKeys,
	keyBox,
	OCTAVE_WIDTH,
	WHITE_HEIGHT,
	whiteKeys,
} from "./notes";

describe("notes", () => {
	it("donne les sept notes naturelles dans l'ordre du clavier", () => {
		expect(whiteKeys.map((key) => key.english)).toEqual([
			"C",
			"D",
			"E",
			"F",
			"G",
			"A",
			"B",
		]);
		expect(whiteKeys.map((key) => key.french)).toEqual([
			"do",
			"ré",
			"mi",
			"fa",
			"sol",
			"la",
			"si",
		]);
	});

	it("donne les cinq touches noires, et pas une de plus", () => {
		expect(blackKeys).toHaveLength(5);
	});

	// Le contrôle qui compte : des touches blanches jointives qui remplissent
	// exactement l'octave. Une largeur fausse ne produirait aucune erreur, juste
	// un clavier légèrement décalé — et des boutons qui ne tombent plus dessus.
	it("pose les touches blanches bout à bout sur toute l'octave", () => {
		let edge = 0;
		for (const key of whiteKeys) {
			expect(key.x).toBeCloseTo(edge, 2);
			edge += key.width;
		}

		expect(edge).toBeCloseTo(OCTAVE_WIDTH, 2);
	});

	it("garde les touches noires dans les limites du clavier", () => {
		for (const key of blackKeys) {
			expect(key.x).toBeGreaterThanOrEqual(0);
			expect(key.x + key.width).toBeLessThanOrEqual(OCTAVE_WIDTH);
		}
	});

	it("ne pose jamais deux touches noires l'une sur l'autre", () => {
		for (let i = 1; i < blackKeys.length; i++) {
			const previous = blackKeys[i - 1];
			const current = blackKeys[i];

			expect(current.x).toBeGreaterThanOrEqual(previous.x + previous.width);
		}
	});

	it("laisse la touche noire plus courte que la blanche", () => {
		expect(BLACK_HEIGHT).toBeLessThan(WHITE_HEIGHT);
	});

	it("convertit une touche en pourcentages du clavier", () => {
		const [first] = whiteKeys;

		expect(keyBox(first)).toEqual({
			left: "0%",
			width: `${(first.width / OCTAVE_WIDTH) * 100}%`,
			height: "100%",
		});
		expect(keyBox(blackKeys[0], true).height).toBe(
			`${(BLACK_HEIGHT / WHITE_HEIGHT) * 100}%`,
		);
	});
});
