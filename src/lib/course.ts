/**
 * Ces types décrivent le *minimum* dont chaque fonction a besoin, pas la forme
 * complète d'une entrée de collection. Les paramètres génériques font le reste :
 * on passe des `CollectionEntry<"parts">`, on récupère des
 * `CollectionEntry<"parts">` — avec leur titre et leur durée — et non la version
 * réduite décrite ici.
 *
 * Sans les génériques, `flattenCourse` rendrait des `Part` : `part.data.title`
 * ne compilerait plus dans les pages, alors que la donnée est bien là.
 */
export type Sequence = {
	id: string;
	data: { title: string; objective: string; order: number };
};

export type Part = {
	id: string;
	data: { order: number; sequence: { id: string } };
};

type Ordered = {
	data: {
		order: number;
	};
};

export const byOrder = (a: Ordered, b: Ordered) => a.data.order - b.data.order;

export const buildCourse = <S extends Sequence, P extends Part>(
	sequences: S[],
	parts: P[],
) => {
	return sequences.toSorted(byOrder).map((sequence) => ({
		...sequence,
		parts: parts
			.filter((part) => part.data.sequence.id === sequence.id)
			.toSorted(byOrder),
	}));
};

export const flattenCourse = <P>(course: { parts: P[] }[]) => {
	return course.flatMap((sequence) => sequence.parts);
};

/**
 * Le type de retour est écrit à la main, et c'est volontaire : aux deux
 * extrémités du cours, l'index sort du tableau et la valeur vaut `undefined`.
 * TypeScript ne le déduit pas tout seul — `parts[index - 1]` est typé `P` — donc
 * `previous.data.title` compilerait et casserait sur la première page.
 */
export const getNeighbours = <P extends { id: string }>(
	parts: P[],
	currentId: string,
): { previous: P | undefined; next: P | undefined } => {
	const index = parts.findIndex((part) => part.id === currentId);

	if (index === -1) {
		throw new Error(`Partie introuvable dans le cours : "${currentId}"`);
	}

	// Pas de `.at()` ici : `.at(-1)` renvoie le *dernier* élément du tableau,
	// donc la dernière partie du cours deviendrait la précédente de la première.
	return {
		previous: parts[index - 1],
		next: parts[index + 1],
	};
};
