import { expect, it, vi } from "vitest";
import { shuffleOptions } from "@/lib/quiz";

it("mélange chaque question en conservant les indices utilisés pour la correction", () => {
	const questions = [
		{ options: ["juste", "faux", "faux"], answer: 0 },
		{ options: ["non", "oui"], answer: 1 },
	];
	const original = structuredClone(questions);
	const random = vi.spyOn(Math, "random").mockReturnValue(0);
	try {
		const order = shuffleOptions(questions);
		expect(order).toEqual([
			[1, 2, 0],
			[1, 0],
		]);
		for (const [index, choices] of order.entries()) {
			expect([...choices].sort()).toEqual(
				questions[index].options.map((_, i) => i),
			);
			const correct = choices.find(
				(choice) => choice === questions[index].answer,
			);
			expect(questions[index].options[correct ?? -1]).toBe(
				original[index].options[original[index].answer],
			);
		}
		random.mockReturnValue(0.999);
		expect(shuffleOptions(questions)).toEqual([
			[0, 1, 2],
			[0, 1],
		]);
		expect(questions).toEqual(original);
	} finally {
		random.mockRestore();
	}
});
