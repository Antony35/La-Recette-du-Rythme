/**
 * Les trois niveaux du cours, tels qu'annoncés dans la vidéo de présentation.
 *
 * Chaque niveau a son aplat pastel. La couleur n'est jamais la seule porteuse de
 * l'information : le libellé « Niveau 1 » est toujours écrit à côté.
 *
 * Les classes sont écrites en toutes lettres, pas assemblées (`bg-${…}`) :
 * Tailwind lit le code source comme du texte et ne génère que les classes qu'il
 * y trouve entières. Une classe construite à l'exécution n'aurait aucun style.
 */
export const levels = {
	1: { label: "Poser une rythmique", fill: "bg-mint" },
	2: { label: "Samples et effets", fill: "bg-sky" },
	3: { label: "Fonctions JS et live", fill: "bg-lilac" },
} as const;

export type Level = keyof typeof levels;

export const levelOf = (level: number) => {
	if (!(level in levels)) {
		throw new Error(`Niveau inconnu : ${level}`);
	}

	return levels[level as Level];
};
