import { ref } from "vue";
import { playOnce, type SoundValue } from "@/lib/strudel-sound";

/**
 * L'état partagé par tout bouton qui joue un son : quelle touche est allumée,
 * et si le chargement a échoué.
 *
 * Ce fichier n'est pas dans `lib/` parce qu'il importe Vue : `lib/` ne dépend
 * d'aucun framework, c'est ce qui le rend testable sans runtime. Un composable
 * est du code Vue, il a donc son propre dossier.
 *
 * `play` est injectable, comme la base de `withBase()` et le chargeur de
 * `createPlayer()` : les tests passent un faux lecteur et vérifient la logique
 * sans navigateur ni moteur audio.
 */
export const useSoundButton = (
	play: (value: SoundValue, duration?: number) => Promise<void> = playOnce,
	highlightMs = 220,
) => {
	/** Identifiant du bouton allumé, ou `null`. */
	const active = ref<string | null>(null);
	const failed = ref(false);

	const trigger = async (
		id: string,
		value: SoundValue,
		duration?: number,
	): Promise<void> => {
		active.value = id;
		setTimeout(() => {
			// Ne pas éteindre un bouton pressé entre-temps : sans cette garde, un
			// clic rapide sur deux touches éteindrait la seconde avant l'heure.
			if (active.value === id) {
				active.value = null;
			}
		}, highlightMs);

		try {
			await play(value, duration);
			failed.value = false;
		} catch {
			// L'échec s'affiche, il ne remonte pas : un son manquant ne doit pas
			// casser la page de cours.
			failed.value = true;
		}
	};

	return { active, failed, trigger };
};
