/**
 * Un seul lecteur à la fois sur une page.
 *
 * Une page de cours porte plusieurs blocs Strudel. Sans arbitrage, lancer le
 * second pendant que le premier tourne superpose deux rythmes sans rapport :
 * l'apprenant entend une bouillie et croit avoir mal écrit son code.
 *
 * L'état est au niveau du module, donc partagé par toutes les instances du
 * composant. `createExclusive()` existe à côté pour que les tests disposent
 * d'une instance neuve — un singleton non isolable rendrait chaque test
 * dépendant de l'ordre d'exécution.
 */
export const createExclusive = () => {
	let current: (() => void) | null = null;

	return {
		/**
		 * Déclare `stop` comme lecteur actif, et arrête le précédent s'il y en
		 * avait un. Rappeler avec le même `stop` ne s'arrête pas soi-même.
		 */
		claim(stop: () => void) {
			if (current !== null && current !== stop) {
				current();
			}

			current = stop;
		},

		/**
		 * Signale que `stop` ne joue plus. Ne fait rien s'il n'est pas l'actif :
		 * sans cette garde, un composant démonté en arrière-plan effacerait le
		 * lecteur qui vient de prendre sa place.
		 */
		release(stop: () => void) {
			if (current === stop) {
				current = null;
			}
		},

		/** Pour les tests et le débogage. */
		get active() {
			return current;
		},
	};
};

/** L'arbitre partagé par tous les blocs Strudel de la page. */
export const playback = createExclusive();
