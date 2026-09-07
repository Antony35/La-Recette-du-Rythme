/**
 * Le site est publié sur GitHub Pages sous un sous-chemin
 * (`https://antony35.github.io/La-Recette-du-Rythme/`), pas à la racine d'un
 * domaine. Un lien écrit `/cours/…` pointerait donc vers la racine de
 * `github.io` et donnerait un 404 — alors qu'en local, avec `pnpm dev`, il
 * marcherait parfaitement. C'est une panne qui n'apparaît qu'une fois en ligne.
 *
 * Astro ne réécrit pas les `href` tout seul : il expose seulement le préfixe
 * configuré dans `base` sous la forme `import.meta.env.BASE_URL`. Tout lien
 * interne du site doit donc passer par ici.
 */

/**
 * Préfixe un chemin interne par la base du site.
 *
 * `base` est un paramètre à valeur par défaut plutôt qu'une lecture directe de
 * l'environnement : la fonction reste pure vis-à-vis de ses arguments, donc
 * testable en lui passant les cas limites, sans avoir à simuler un build Astro.
 *
 * @example withBase("/cours/ma-sequence", "/mon-site/") // "/mon-site/cours/ma-sequence"
 * @example withBase("/cours/ma-sequence", "/")          // "/cours/ma-sequence"
 */
export const withBase = (
	path: string,
	base: string = import.meta.env.BASE_URL,
) => {
	// On normalise des deux côtés avant de recoller : sans ça, une base finissant
	// par « / » et un chemin commençant par « / » produiraient un double slash.
	const prefix = base.replace(/\/+$/, "");
	const suffix = path.replace(/^\/+/, "");

	return `${prefix}/${suffix}`;
};
