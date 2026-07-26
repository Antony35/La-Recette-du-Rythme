import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const sequences = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "src/content/sequences" }),
	schema: z.object({
		numero: z.string(),
		title: z.string(),
		objectif: z.string(),
	}),
});

const parties = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "src/content/parties" }),
	schema: z.object({
		title: z.string(),
		sequence: reference("sequences"),
		order: z.number(),
		duree: z.number().default(15),
	}),
});

export const collections = { sequences, parties };
