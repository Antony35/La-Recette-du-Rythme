/**
 * Une octave de clavier : la correspondance entre la notation anglaise que
 * Strudel attend (`c`, `d`, `e`…) et les noms français (do, ré, mi…).
 *
 * La géométrie est reprise telle quelle du clavier affiché par Strudel : les
 * touches blanches n'ont pas toutes la même largeur (23,33 px pour do-ré-mi,
 * 24,5 px pour fa-sol-la-si), parce que ce sont les touches *noires* qui sont
 * régulièrement espacées. Un clavier dessiné avec sept blanches égales a l'air
 * juste de loin et faux dès qu'on regarde les noires.
 *
 * Ces mesures sont ici, et pas dans le composant, pour la même raison que
 * `levels.ts` : une donnée se teste, un gabarit non. `keyBox()` les traduit en
 * pourcentages, pour qu'aucune coordonnée ne soit recopiée à la main ailleurs.
 */
export interface Key {
	/** Le nom à écrire dans `note("…")`, en minuscules comme Strudel l'attend. */
	code: string;
	/** La notation anglaise, telle qu'on la lit sur une partition. */
	english: string;
	/** Le nom français usuel. */
	french: string;
	/** Abscisse du bord gauche, dans le repère du SVG. */
	x: number;
	/** Largeur de la touche. */
	width: number;
}

/** Hauteur d'une touche blanche, et hauteur totale du clavier. */
export const WHITE_HEIGHT = 108.75;
/** Hauteur d'une touche noire : elle s'arrête avant le bas. */
export const BLACK_HEIGHT = 75;
/** Largeur totale d'une octave — la somme des sept touches blanches. */
export const OCTAVE_WIDTH = 168;

export const whiteKeys: Key[] = [
	{ code: "c", english: "C", french: "do", x: 0, width: 23.333 },
	{ code: "d", english: "D", french: "ré", x: 23.333, width: 23.333 },
	{ code: "e", english: "E", french: "mi", x: 46.667, width: 23.333 },
	{ code: "f", english: "F", french: "fa", x: 70, width: 24.5 },
	{ code: "g", english: "G", french: "sol", x: 94.5, width: 24.5 },
	{ code: "a", english: "A", french: "la", x: 119, width: 24.5 },
	{ code: "b", english: "B", french: "si", x: 143.5, width: 24.5 },
];

export const blackKeys: Key[] = [
	{ code: "c#", english: "C♯", french: "do♯", x: 14, width: 14 },
	{ code: "d#", english: "D♯", french: "ré♯", x: 42, width: 14 },
	{ code: "f#", english: "F♯", french: "fa♯", x: 84, width: 14 },
	{ code: "g#", english: "G♯", french: "sol♯", x: 112, width: 14 },
	{ code: "a#", english: "A♯", french: "la♯", x: 140, width: 14 },
];

/**
 * Position et taille en pourcentage du clavier, pour poser un élément HTML
 * exactement sur une touche sans recopier les mesures ailleurs.
 */
export const keyBox = (key: Key, black = false) => ({
	left: `${(key.x / OCTAVE_WIDTH) * 100}%`,
	width: `${(key.width / OCTAVE_WIDTH) * 100}%`,
	height: `${((black ? BLACK_HEIGHT : WHITE_HEIGHT) / WHITE_HEIGHT) * 100}%`,
});
