import { describe, expect, it } from "vitest";
import { recommend, scoreByAxis } from "./placement";

const axes = [
	{ id: "musique", threshold: 2, skippable: true },
	{ id: "mao", threshold: 2, skippable: true },
	{ id: "javascript", threshold: 2, skippable: false },
];

// Deux questions par axe, volontairement entrelacées : le score doit suivre
// l'axe de chaque question, pas sa position dans la liste.
const questions = [
	{ axis: "musique", answer: 0 },
	{ axis: "mao", answer: 1 },
	{ axis: "javascript", answer: 2 },
	{ axis: "musique", answer: 3 },
	{ axis: "mao", answer: 0 },
	{ axis: "javascript", answer: 1 },
];

const allRight = questions.map((question) => question.answer);

describe("scoreByAxis", () => {
	it("compte les bonnes réponses axe par axe", () => {
		const answers = [0, 1, 0, 0, 0, 1];
		const results = scoreByAxis(axes, questions, answers);

		expect(
			results.map(({ axis, score, total }) => [axis.id, score, total]),
		).toEqual([
			["musique", 1, 2],
			["mao", 2, 2],
			["javascript", 1, 2],
		]);
	});

	it("marque un axe acquis à partir du seuil, seuil compris", () => {
		const results = scoreByAxis(axes, questions, allRight);

		expect(results.every((result) => result.acquired)).toBe(true);
	});

	it("compte une question sans réponse comme fausse", () => {
		const answers = allRight.map(() => null);
		const results = scoreByAxis(axes, questions, answers);

		expect(results.map((result) => result.score)).toEqual([0, 0, 0]);
	});

	it("rend les axes reçus, avec leurs champs supplémentaires", () => {
		const labelled = axes.map((axis) => ({
			...axis,
			label: axis.id.toUpperCase(),
		}));
		const [first] = scoreByAxis(labelled, questions, allRight);

		expect(first.axis.label).toBe("MUSIQUE");
	});
});

describe("recommend", () => {
	it("recommande de sauter la séquence quand tous les axes sautables sont acquis", () => {
		// JavaScript raté : il n'est pas sautable, donc il ne bloque pas le saut.
		const answers = [0, 1, 0, 3, 0, 0];
		const recommendation = recommend(scoreByAxis(axes, questions, answers));

		expect(recommendation.route).toBe("skip");
		expect(recommendation.toReview.map((axis) => axis.id)).toEqual([
			"javascript",
		]);
	});

	it("recommande de suivre la séquence dès qu'un axe sautable manque", () => {
		const answers = [0, 1, 2, 0, 1, 1];
		const recommendation = recommend(scoreByAxis(axes, questions, answers));

		expect(recommendation.route).toBe("follow");
		expect(recommendation.toReview.map((axis) => axis.id)).toEqual([
			"musique",
			"mao",
		]);
	});

	it("ne recommande pas de sauter quand aucun axe n'est sautable", () => {
		const locked = axes.map((axis) => ({ ...axis, skippable: false }));
		const recommendation = recommend(scoreByAxis(locked, questions, allRight));

		expect(recommendation.route).toBe("follow");
		expect(recommendation.toReview).toEqual([]);
	});
});
