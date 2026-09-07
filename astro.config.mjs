// @ts-check
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	// Installer @astrojs/mdx ne suffit pas : sans mdx() ici, Astro ne sait pas
	// traiter les .mdx et recopie les balises de composant en texte brut.
	// mdx() vient après vue() : il hérite ainsi de la configuration Markdown déjà
	// en place, et les composants .vue rencontrés dans un .mdx sont reconnus.
	integrations: [vue(), mdx()],

	vite: {
		plugins: [tailwindcss()],
	},
});
