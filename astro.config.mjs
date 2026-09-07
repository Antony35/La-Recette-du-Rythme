// @ts-check
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	// Le site est publié par GitHub Pages sur le sous-chemin du dépôt.
	// `site` sert aux URLs absolues (canoniques, sitemap) ; `base` préfixe tout
	// ce qui est servi. Les deux sont nécessaires : sans `base`, les liens et les
	// assets pointeraient vers la racine de github.io.
	// Conséquence en local : `pnpm dev` sert désormais sur
	// http://localhost:4321/La-Recette-du-Rythme/ et non plus sur « / ».
	site: "https://antony35.github.io",
	base: "/La-Recette-du-Rythme",

	// Installer @astrojs/mdx ne suffit pas : sans mdx() ici, Astro ne sait pas
	// traiter les .mdx et recopie les balises de composant en texte brut.
	// mdx() vient après vue() : il hérite ainsi de la configuration Markdown déjà
	// en place, et les composants .vue rencontrés dans un .mdx sont reconnus.
	integrations: [vue(), mdx()],

	vite: {
		plugins: [tailwindcss()],
	},
});
