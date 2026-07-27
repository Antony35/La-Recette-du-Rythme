import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const sequences = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "src/content/sequences" }),
	schema: z.object({
		title: z.string(),
		objective: z.string(),
		order: z.number(),
	}),
});

const parts = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "src/content/parts" }),
	schema: z.object({
		title: z.string(),
		sequence: reference("sequences"),
		order: z.number(),
		durationMinutes: z.number().default(15),
	}),
});

export const collections = { sequences, parts };
