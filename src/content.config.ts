import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const sequences = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/sequences" }),
	schema: z.object({
		title: z.string().min(1),
		objective: z.string().min(1),
		order: z.number().int().positive(),
	}),
});

const parts = defineCollection({
	// Le pattern doit accepter .mdx, sinon le glob ne ramasse pas les parties
	// interactives : elles disparaissent du site sans la moindre erreur au build.
	loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/parts" }),
	schema: z.object({
		title: z.string().min(1),
		sequence: reference("sequences"),
		order: z.number().int().positive(),
		durationMinutes: z.number().int().positive().default(15),
	}),
});

const quizzes = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/quizzes" }),
	schema: z.object({
		part: reference("parts"),
		questions: z
			.array(
				z
					.object({
						question: z.string().min(1),
						options: z.array(z.string().min(1)).min(2),
						/** Index de la bonne réponse dans `options`, à partir de 0. */
						answer: z.number().int().nonnegative(),
						explanation: z.string().min(1),
					})
					// Le contrôle qui compte : `answer` doit désigner une option qui
					// existe. Une erreur de décalage est indétectable à la relecture
					// et donnerait un quiz qui corrige faux, sans jamais planter.
					// Ici, le build s'arrête.
					.refine((question) => question.answer < question.options.length, {
						message:
							"`answer` doit désigner une option existante (index à partir de 0).",
						path: ["answer"],
					}),
			)
			.min(1),
	}),
});

export const collections = { sequences, parts, quizzes };
