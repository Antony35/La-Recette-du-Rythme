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

export const collections = { sequences, parts };
