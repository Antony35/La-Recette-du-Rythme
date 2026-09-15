/**
 * Score et recommandation du test de positionnement.
 *
 * Même règle que `course.ts` : aucune dépendance au runtime Astro ni à Vue. Le
 * composant appelle ces fonctions, les tests aussi, avec les mêmes données.
 *
 * Les types décrivent le minimum nécessaire ; les génériques rendent les axes
 * reçus tels quels, avec leur libellé et leur conseil.
 */
export type Axis = {
	id: string;
	threshold: number;
	skippable: boolean;
};

export type AxisQuestion = {
	axis: string;
	answer: number;
};

export type AxisResult<A extends Axis> = {
	axis: A;
	score: number;
	total: number;
	acquired: boolean;
};

/**
 * `answers[i]` est l'option choisie pour `questions[i]`, ou `null` sans réponse.
 * Une question sans réponse compte comme fausse : le composant n'autorise la
 * validation qu'une fois tout rempli, mais la fonction ne le suppose pas.
 */
export const scoreByAxis = <A extends Axis>(
	axes: A[],
	questions: AxisQuestion[],
	answers: (number | null)[],
): AxisResult<A>[] =>
	axes.map((axis) => {
		const indexes = questions
			.map((question, index) => ({ question, index }))
			.filter(({ question }) => question.axis === axis.id);

		const score = indexes.filter(
			({ question, index }) => answers[index] === question.answer,
		).length;

		return {
			axis,
			score,
			total: indexes.length,
			acquired: score >= axis.threshold,
		};
	});

export type Recommendation<A extends Axis> = {
	/** `skip` : passer à la séquence suivante ; `follow` : suivre celle-ci. */
	route: "skip" | "follow";
	/** Les axes non acquis, dans l'ordre déclaré — ce sont eux qui ont un conseil. */
	toReview: A[];
};

export const recommend = <A extends Axis>(
	results: AxisResult<A>[],
): Recommendation<A> => {
	const skippable = results.filter((result) => result.axis.skippable);

	// Sans aucun axe `skippable`, rien ne justifie de sauter la séquence : on
	// refuse explicitement le `every()` d'un tableau vide, qui vaudrait `true`.
	const canSkip =
		skippable.length > 0 && skippable.every((result) => result.acquired);

	return {
		route: canSkip ? "skip" : "follow",
		toReview: results
			.filter((result) => !result.acquired)
			.map((result) => result.axis),
	};
};
