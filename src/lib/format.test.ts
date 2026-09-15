import { describe, expect, it } from "vitest";
import { codeSegments, formatDuration, plural, splitTitle } from "./format";

describe("plural", () => {
	it("garde le singulier pour zéro et un", () => {
		expect(plural(0, "partie", "parties")).toBe("0 partie");
		expect(plural(1, "partie", "parties")).toBe("1 partie");
		expect(plural(5, "partie", "parties")).toBe("5 parties");
	});
});

describe("formatDuration", () => {
	it("écrit les minutes seules sous une heure", () => {
		expect(formatDuration(20)).toBe("20 min");
	});

	it("écrit les heures pleines sans minutes", () => {
		expect(formatDuration(120)).toBe("2 h");
		expect(formatDuration(900)).toBe("15 h");
	});

	it("complète les minutes sur deux chiffres", () => {
		expect(formatDuration(90)).toBe("1 h 30");
		expect(formatDuration(65)).toBe("1 h 05");
	});
});

describe("splitTitle", () => {
	it("sépare le titre et sa précision", () => {
		expect(splitTitle("Le REPL — écrire, évaluer")).toEqual({
			main: "Le REPL",
			subtitle: "écrire, évaluer",
		});
	});

	it("laisse un titre sans tiret cadratin intact", () => {
		expect(splitTitle("Rythme")).toEqual({
			main: "Rythme",
			subtitle: undefined,
		});
	});

	it("ne coupe qu'au premier tiret cadratin", () => {
		expect(splitTitle("A — B — C").subtitle).toBe("B — C");
	});
});

describe("codeSegments", () => {
	it("alterne texte et code sur les accents graves", () => {
		expect(codeSegments("Joue `bd` puis `sd`.")).toEqual([
			{ value: "Joue ", code: false },
			{ value: "bd", code: true },
			{ value: " puis ", code: false },
			{ value: "sd", code: true },
			{ value: ".", code: false },
		]);
	});
});
