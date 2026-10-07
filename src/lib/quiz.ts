/** Mélange les indices, sans modifier les options ni l'indice de la bonne réponse. */
export function shuffleOptions(questions: { options: readonly string[] }[]) {
	return questions.map(({ options }) => {
		const order = options.map((_, index) => index);
		for (let i = order.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[order[i], order[j]] = [order[j], order[i]];
		}
		return order;
	});
}
