import { defineCollection, reference } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const sequences = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/sequences" }),
	schema: z.object({
		title: z.string().min(1),
		objective: z.string().min(1),
		order: z.number().int().positive(),
		// Les trois niveaux annoncés dans la vidéo de présentation : sons de base,
		// samples et effets, fonctions JS et live. C'est une décision pédagogique,
		// pas une position : elle ne se déduit pas de `order`.
		level: z.number().int().min(1).max(3),
		// Durée *prévue* par la scénarisation. Elle ne peut pas se déduire des
		// parties tant que celles-ci ne sont pas toutes rédigées.
		durationMinutes: z.number().int().positive(),
		equipment: z.array(z.string().min(1)).default([]),
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

/**
 * Une question à choix unique. Partagée entre les quiz de fin de partie et le
 * test de positionnement, pour que le même contrôle s'applique aux deux.
 */
const question = z.object({
	question: z.string().min(1),
	options: z.array(z.string().min(1)).min(2),
	/** Index de la bonne réponse dans `options`, à partir de 0. */
	answer: z.number().int().nonnegative(),
	explanation: z.string().min(1),
});

// Le contrôle qui compte : `answer` doit désigner une option qui existe. Une
// erreur de décalage est indétectable à la relecture et donnerait un quiz qui
// corrige faux, sans jamais planter. Ici, le build s'arrête.
const answerExists = <T extends z.infer<typeof question>>(
	schema: z.ZodType<T>,
) =>
	schema.refine((item) => item.answer < item.options.length, {
		message:
			"`answer` doit désigner une option existante (index à partir de 0).",
		path: ["answer"],
	});

const quizzes = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/quizzes" }),
	schema: z.object({
		part: reference("parts"),
		questions: z.array(answerExists(question)).min(1),
	}),
});

/**
 * Test de positionnement : des questions rangées par axe, un score par axe, et
 * une recommandation de parcours calculée par `lib/placement.ts`.
 */
const placementTests = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/placement" }),
	schema: z
		.object({
			part: reference("parts"),
			axes: z
				.array(
					z.object({
						id: z.string().min(1),
						label: z.string().min(1),
						/** Nombre de bonnes réponses à partir duquel l'axe est acquis. */
						threshold: z.number().int().positive(),
						/** Un axe `skippable` acquis autorise à sauter la séquence. */
						skippable: z.boolean(),
						/** Conseil affiché quand l'axe n'est pas acquis. */
						advice: z.string().min(1),
					}),
				)
				.min(1),
			questions: z
				.array(answerExists(question.extend({ axis: z.string().min(1) })))
				.min(1),
		})
		// Même logique que pour `answer` : un axe mal orthographié ferait
		// disparaître la question du score, sans rien casser d'autre.
		.refine(
			(test) =>
				test.questions.every((item) =>
					test.axes.some((axis) => axis.id === item.axis),
				),
			{
				message: "Chaque question doit désigner un axe déclaré dans `axes`.",
				path: ["questions"],
			},
		)
		.refine(
			(test) =>
				test.axes.every(
					(axis) =>
						axis.threshold <=
						test.questions.filter((item) => item.axis === axis.id).length,
				),
			{
				message:
					"Le seuil d'un axe ne peut pas dépasser son nombre de questions.",
			},
		),
});

const sources = defineCollection({
	// Un seul fichier YAML, une entrée par source : `file()` prend le champ `id`
	// de chaque élément comme identifiant.
	loader: file("src/content/sources.yaml"),
	schema: z.object({
		title: z.string().min(1),
		url: z.url(),
		category: z.enum([
			"documentation",
			"switch-angel",
			"articles",
			"tutoriels",
		]),
		author: z.string().min(1).optional(),
		note: z.string().min(1).optional(),
		/** Date du dernier contrôle de l'URL. */
		checkedAt: z.coerce.date(),
	}),
});

export const collections = {
	sequences,
	parts,
	quizzes,
	placementTests,
	sources,
};
