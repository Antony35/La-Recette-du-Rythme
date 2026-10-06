<script setup lang="ts">
import { ref } from "vue";
import { blackKeys, type Key, keyBox, whiteKeys } from "@/lib/notes";
import { playOnce } from "@/lib/strudel-sound";

/**
 * Une octave de clavier : chaque touche porte son nom anglais et son nom
 * français, et la joue au clic.
 *
 * Ce sont de vrais `<button>`, pas des formes SVG : on récupère gratuitement
 * le focus clavier, l'activation à Entrée et Espace, et le rôle annoncé par un
 * lecteur d'écran. Le dessin, lui, ne tient qu'à du positionnement.
 *
 * La géométrie vient de `lib/notes.ts` et n'est pas recopiée ici : les touches
 * blanches n'ont volontairement pas toutes la même largeur, parce que ce sont
 * les noires qui sont régulièrement espacées.
 */
const props = withDefaults(
	defineProps<{
		/** Octave jouée, au sens de Strudel : `c4` est le do central. */
		octave?: number;
	}>(),
	{ octave: 4 },
);

/** Touche en cours de pression, pour le retour visuel. */
const active = ref<string | null>(null);
const failed = ref(false);

const press = async (key: Key) => {
	active.value = key.code;
	window.setTimeout(() => {
		// Ne pas éteindre une autre touche jouée entre-temps.
		if (active.value === key.code) {
			active.value = null;
		}
	}, 220);

	try {
		// `triangle` est une forme d'onde intégrée : elle sonne sans télécharger
		// le moindre échantillon, contrairement à un piano.
		await playOnce({ note: `${key.code}${props.octave}`, s: "triangle" }, 0.6);
		failed.value = false;
	} catch {
		failed.value = true;
	}
};
</script>

<template>
	<figure class="not-prose my-10">
		<div
			class="relative w-full overflow-hidden rounded-xl border-2 border-night bg-snow select-none"
			style="aspect-ratio: 168 / 108.75"
		>
			<button
				v-for="key in whiteKeys"
				:key="key.code"
				type="button"
				class="absolute top-0 flex flex-col items-center justify-end gap-0.5 border-r border-night/30 pb-2 text-night transition-colors last:border-r-0 hover:bg-lemon focus-visible:bg-lemon"
				:class="active === key.code ? 'bg-lemon' : 'bg-snow'"
				:style="keyBox(key)"
				:aria-label="`${key.french}, note ${key.english}`"
				@click="press(key)"
			>
				<span class="display-title text-[clamp(0.9rem,2.6vw,1.6rem)] leading-none">{{ key.english }}</span>
				<span class="text-[clamp(0.5rem,1.5vw,0.8rem)] leading-none font-semibold text-night-soft">{{ key.french }}</span>
			</button>

			<button
				v-for="key in blackKeys"
				:key="key.code"
				type="button"
				class="absolute top-0 flex items-end justify-center rounded-b-sm pb-1 text-[clamp(0.4rem,1.2vw,0.65rem)] leading-none font-bold transition-colors"
				:class="active === key.code ? 'bg-pulse text-night' : 'bg-night text-snow hover:bg-night-soft'"
				:style="keyBox(key, true)"
				:aria-label="`${key.french}, note ${key.english}`"
				@click="press(key)"
			>
				{{ key.english }}
			</button>
		</div>

		<figcaption class="mt-3 text-sm text-muted">
			<template v-if="failed">
				Le son n'a pas pu être chargé. Vérifiez votre connexion, puis réessayez.
			</template>
			<template v-else>
				Cliquez une touche pour l'entendre. Le premier clic télécharge le moteur
				audio.
			</template>
		</figcaption>
	</figure>
</template>
