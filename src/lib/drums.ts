/**
 * Les sons de batterie de Strudel : le code à taper, ce qu'il désigne, et où le
 * trouver sur le schéma.
 *
 * La liste des codes vient du tableau officiel de `strudel.cc/learn/samples/`,
 * pas d'une liste reconstituée de mémoire.
 *
 * `figure` renvoie à un numéro du schéma `assets/Drum_set.svg`, dont la légende
 * d'origine est : 1 ride, 2 tom basse, 3 toms, 4 grosse caisse, 5 caisse claire,
 * 6 charleston. Deux codes peuvent partager un numéro — `sd` et `rim` sont le
 * même fût, `hh` et `oh` le même instrument — et deux codes n'en ont aucun :
 * `cr` parce que le schéma ne numérote pas la cymbale crash, `cp` parce qu'un
 * claquement de mains n'est pas un élément de batterie. C'est précisément cette
 * asymétrie que la partie 1.4 explique.
 */
export interface Drum {
	/** Le code à écrire dans `s("…")`. */
	code: string;
	/** Le nom anglais dont le code est l'abréviation. */
	english: string;
	/** Le nom français usuel. */
	french: string;
	/** Numéro sur le schéma, ou `null` si la pièce n'y est pas numérotée. */
	figure: number | null;
	/** Ce que le code ajoute par rapport à un autre code du même numéro. */
	nuance?: string;
}

export const drums: Drum[] = [
	{ code: "bd", english: "bass drum", french: "grosse caisse", figure: 4 },
	{ code: "sd", english: "snare drum", french: "caisse claire", figure: 5 },
	{
		code: "rim",
		english: "rimshot",
		french: "coup sur le cercle",
		figure: 5,
		nuance: "même fût que `sd`, frappé sur le cercle et non sur la peau",
	},
	{ code: "hh", english: "hihat", french: "charleston fermé", figure: 6 },
	{
		code: "oh",
		english: "open hihat",
		french: "charleston ouvert",
		figure: 6,
		nuance: "même instrument que `hh`, pédale relâchée",
	},
	{ code: "lt", english: "low tom", french: "tom basse", figure: 2 },
	{ code: "mt", english: "middle tom", french: "tom médium", figure: 3 },
	{ code: "ht", english: "high tom", french: "tom aigu", figure: 3 },
	{ code: "rd", english: "ride cymbal", french: "cymbale ride", figure: 1 },
	{
		code: "cr",
		english: "crash cymbal",
		french: "cymbale crash",
		figure: null,
		nuance: "absente du schéma, qui ne numérote qu'une cymbale",
	},
	{
		code: "cp",
		english: "clap",
		french: "claquement de mains",
		figure: null,
		nuance:
			"ce n'est pas un élément de batterie, mais un son de boîte à rythmes",
	},
];

/** Les numéros réellement présents sur le schéma. */
export const figureNumbers = [1, 2, 3, 4, 5, 6] as const;

/** Les codes rattachés à un numéro du schéma, dans l'ordre de la liste. */
export const drumsOfFigure = (figure: number) =>
	drums.filter((drum) => drum.figure === figure);
