import { describe, expect, test } from "vitest";
import { buildCourse, flattenCourse, getNeighbours } from "./course";

/**
 * Les fonctions testées ici sont volontairement pures : elles reçoivent les
 * séquences et les parties en arguments plutôt que d'appeler getCollection().
 * Aucun import d'`astro:content` ne doit apparaître dans ce fichier.
 *
 * Les fabriques ci-dessous ne prennent que ce qui varie d'un test à l'autre :
 * tout ce qui apparaît dans un test doit compter pour ce test.
 */
const makeSequence = (id: string, order: number) => ({
	id,
	data: {
		title: `Séquence ${id}`,
		objective: "Objective de la séquence",
		order,
	},
});

const makePart = (id: string, order: number, sequenceId: string) => ({
	id,
	data: {
		title: `Partie ${id}`,
		order: order,
		durationMinutes: 15,
		sequence: {
			collection: "sequences",
			id: sequenceId,
		},
	},
});

describe("buildCourse — construction de l'arbre", () => {
	test("trie les séquences par order", () => {
		const sequences = [
			makeSequence("seq-3", 3),
			makeSequence("seq-1", 1),
			makeSequence("seq-2", 2),
		];
		const course = buildCourse(sequences, []);
		expect(course.map((s) => s.id)).toEqual(["seq-1", "seq-2", "seq-3"]);
	});

	test("trie les parties de chaque séquence par order", () => {
		const sequences = [makeSequence("seq-1", 1)];
		const parts = [
			makePart("part-3", 3, "seq-1"),
			makePart("part-1", 1, "seq-1"),
			makePart("part-2", 2, "seq-1"),
		];
		const course = buildCourse(sequences, parts);
		expect(course[0].parts.map((p) => p.id)).toEqual([
			"part-1",
			"part-2",
			"part-3",
		]);
	});

	test("rattache chaque partie à sa séquence", () => {
		const sequences = [makeSequence("seq-1", 1), makeSequence("seq-2", 2)];
		const parts = [
			makePart("part-1", 1, "seq-1"),
			makePart("part-2", 2, "seq-2"),
		];
		const course = buildCourse(sequences, parts);
		expect(course[0].parts.map((p) => p.id)).toEqual(["part-1"]);
		expect(course[1].parts.map((p) => p.id)).toEqual(["part-2"]);
	});

	test("conserve une séquence sans partie, avec parts: []", () => {
		const sequences = [makeSequence("seq-1", 2)];
		const course = buildCourse(sequences, []);
		expect(course.map((s) => s.id)).toEqual(["seq-1"]);
		expect(course[0].parts).toEqual([]);
	});
});

describe("flattenCourse — liste plate ordonnée", () => {
	test("respecte l'ordre séquence puis order", () => {
		const sequences = [makeSequence("seq-1", 1), makeSequence("seq-2", 2)];
		const parts = [
			makePart("part-a", 1, "seq-1"),
			makePart("part-b", 2, "seq-1"),
			makePart("part-c", 3, "seq-2"),
			makePart("part-d", 4, "seq-2"),
		];

		const course = buildCourse(sequences, parts);
		const flat = flattenCourse(course);
		expect(flat.map((p) => p.id)).toEqual([
			"part-a",
			"part-b",
			"part-c",
			"part-d",
		]);
	});

	test("ignore les séquences sans partie", () => {
		// seq-2 est vide : elle doit disparaître de la liste plate sans y
		// laisser de trou entre part-1 et part-3.
		const sequences = [
			makeSequence("seq-1", 1),
			makeSequence("seq-2", 2),
			makeSequence("seq-3", 3),
		];
		const parts = [
			makePart("part-1", 1, "seq-1"),
			makePart("part-3", 1, "seq-3"),
		];

		const course = buildCourse(sequences, parts);
		const flat = flattenCourse(course);

		expect(flat.map((p) => p.id)).toEqual(["part-1", "part-3"]);
	});

	test("contient toutes les parties, une seule fois", () => {
		const sequences = [makeSequence("seq-1", 1), makeSequence("seq-2", 2)];
		const parts = [
			makePart("part-1", 1, "seq-1"),
			makePart("part-2", 2, "seq-1"),
			makePart("part-3", 3, "seq-2"),
			makePart("part-4", 4, "seq-2"),
		];

		const course = buildCourse(sequences, parts);
		const flat = flattenCourse(course);

		expect(flat.length).toEqual(parts.length);
		expect(new Set(flat.map((p) => p.id)).size).toBe(parts.length);
	});
});

describe("getNeighbours — navigation globale", () => {
	test("renvoie les parties adjacentes au milieu d'une séquence", () => {
		const sequences = [makeSequence("seq-1", 1)];
		const parts = [
			makePart("part-1", 1, "seq-1"),
			makePart("part-2", 2, "seq-1"),
			makePart("part-3", 3, "seq-1"),
		];

		const course = buildCourse(sequences, parts);
		const flat = flattenCourse(course);
		const neighbours = getNeighbours(flat, "part-2");

		expect(neighbours.previous.id).toBe("part-1");
		expect(neighbours.next.id).toBe("part-3");
	});

	test("franchit la frontière entre deux séquences", () => {
		const sequences = [makeSequence("seq-1", 1), makeSequence("seq-2", 2)];
		const parts = [
			makePart("part-1", 1, "seq-1"),
			makePart("part-2", 2, "seq-1"),
			makePart("part-3", 1, "seq-2"),
		];

		const course = buildCourse(sequences, parts);
		const flat = flattenCourse(course);
		const neighbours = getNeighbours(flat, "part-2");

		expect(neighbours.next.id).toBe("part-3");
		expect(neighbours.next.data.sequence.id).toBe("seq-2");
	});

	test("renvoie previous: undefined pour la première partie du cours", () => {
		const sequences = [makeSequence("seq-1", 1), makeSequence("seq-2", 2)];
		const parts = [
			makePart("part-1", 1, "seq-1"),
			makePart("part-2", 1, "seq-2"),
		];

		const course = buildCourse(sequences, parts);
		const flat = flattenCourse(course);
		const neighbours = getNeighbours(flat, "part-1");

		expect(neighbours.previous).toBeUndefined();
		expect(neighbours.next.id).toBe("part-2");
	});

	test("renvoie next: undefined pour la dernière partie du cours", () => {
		const sequences = [makeSequence("seq-1", 1), makeSequence("seq-2", 2)];
		const parts = [
			makePart("part-1", 1, "seq-1"),
			makePart("part-2", 1, "seq-2"),
		];

		const course = buildCourse(sequences, parts);
		const flat = flattenCourse(course);
		const neighbours = getNeighbours(flat, "part-2");

		expect(neighbours.previous.id).toBe("part-1");
		expect(neighbours.next).toBeUndefined();
	});

	test("enjambe une séquence vide", () => {
		const sequences = [
			makeSequence("seq-1", 1),
			makeSequence("seq-2", 2),
			makeSequence("seq-3", 3),
		];
		const parts = [
			makePart("part-1", 1, "seq-1"),
			makePart("part-2", 2, "seq-3"),
		];

		const course = buildCourse(sequences, parts);
		const flat = flattenCourse(course);
		const neighbours = getNeighbours(flat, "part-1");

		expect(neighbours.next.id).toBe("part-2");
		expect(neighbours.next.data.sequence.id).toBe("seq-3");
	});

	test("lève une erreur sur un identifiant de partie inconnu", () => {
		const sequences = [makeSequence("seq-1", 1)];
		const parts = [makePart("part-1", 1, "seq-1")];

		const course = buildCourse(sequences, parts);
		const flat = flattenCourse(course);

		expect(() => getNeighbours(flat, "part-fantome")).toThrow(
			'Partie introuvable dans le cours : "part-fantome"',
		);
	});
});
