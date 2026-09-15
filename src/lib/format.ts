/**
 * Petites mises en forme d'affichage, partagées par plusieurs layouts.
 * Pures : aucun accès au runtime Astro, donc testables telles quelles.
 */

/** « 1 partie », « 0 partie », « 5 parties » — zéro reste au singulier en français. */
export const plural = (count: number, one: string, many: string) =>
	`${count} ${count > 1 ? many : one}`;

/**
 * 20 → « 20 min », 90 → « 1 h 30 », 120 → « 2 h ».
 * Les espaces sont insécables : « 1 h » ne doit jamais se couper en fin de ligne.
 */
export const formatDuration = (minutes: number) => {
	const hours = Math.floor(minutes / 60);
	const rest = minutes % 60;

	if (hours === 0) {
		return `${rest} min`;
	}

	return rest === 0
		? `${hours} h`
		: `${hours} h ${String(rest).padStart(2, "0")}`;
};

/**
 * Sépare « Titre — précision » en deux morceaux.
 *
 * Les titres de la scénarisation suivent tous ce modèle. Le titre court part en
 * capitales condensées, la précision en texte courant : mise en capitales, une
 * phrase entière ne se lirait plus.
 */
export const splitTitle = (title: string) => {
	const [main, ...rest] = title.split(" — ");

	return {
		main,
		subtitle: rest.length > 0 ? rest.join(" — ") : undefined,
	};
};

/**
 * Découpe un texte sur les accents graves pour rendre `du code` en <code>.
 *
 * Le texte des quiz est brut, pas du Markdown rendu. On renvoie des segments,
 * jamais du HTML : le composant en fait des nœuds de texte, donc aucune
 * injection n'est possible depuis un fichier de contenu.
 */
export const codeSegments = (text: string) =>
	text.split("`").map((value, index) => ({ value, code: index % 2 === 1 }));
