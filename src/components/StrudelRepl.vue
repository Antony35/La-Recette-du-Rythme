<script setup lang="ts">
// Le REPL Strudel complet : le même éditeur que sur strudel.cc — code modifiable,
// coloration syntaxique, évaluation au clavier.
//
// Il remplace le lecteur écrit à la main : celui-ci appelait directement
// initAudio() / samples() / webaudioRepl(), ce qui montrait bien la mécanique
// mais ne permettait pas d'éditer quoi que ce soit.
import type { StrudelMirror } from "@strudel/codemirror";
import { onUnmounted, ref, useId } from "vue";

const props = defineProps<{
	code: string;
	/** Titre du bloc, ex. « Essaie tout de suite ». Rendu en <h2>. */
	label?: string;
}>();

// La section est nommée par son titre via aria-labelledby : sans ça, un lecteur
// d'écran annonce « région » sans dire laquelle. L'identifiant doit être unique,
// puisqu'une page peut contenir plusieurs REPL.
//
// useId() et pas Math.random() : l'identifiant doit être *le même* au rendu
// serveur et à l'hydratation, sinon Vue détecte une divergence et remplace le
// DOM. Vue 3.5 génère ici une valeur stable des deux côtés.
const headingId = useId();

// L'élément personnalisé porte son éditeur sur la propriété `editor`.
type EditorElement = HTMLElement & { editor?: StrudelMirror };

const isLoading = ref(false);
const isReady = ref(false);
const isPlaying = ref(false);
const error = ref<string | null>(null);

// Le conteneur doit exister dans le DOM avant l'insertion : <strudel-editor>
// place son éditeur en *frère suivant*, pas en enfant.
const host = ref<HTMLDivElement | null>(null);

// Volontairement pas un ref() : ni l'élément ni l'éditeur ne sont affichés, et
// Vue irait inspecter en profondeur un très gros objet pour rien.
let editorElement: EditorElement | null = null;

async function loadEditor() {
	if (!host.value) {
		return;
	}

	// 2,3 Mo — CodeMirror, le transpileur et tout Strudel. Hors de question de
	// les envoyer à quelqu'un qui lit la page sans jamais cliquer : l'import
	// dynamique ne déclenche le téléchargement qu'ici.
	// L'import n'a pas de valeur de retour : il enregistre <strudel-editor>.
	await import("@strudel/repl");

	// initAudioOnFirstClick() du paquet s'abonne au *prochain* clic. Le nôtre est
	// déjà passé au moment où l'import se termine, donc on réveille le contexte
	// nous-mêmes — l'autorisation reste acquise, la page a bien reçu un geste.
	const { getAudioContext } = await import("@strudel/webaudio");
	await getAudioContext().resume();

	const element = document.createElement("strudel-editor") as EditorElement;
	// L'attribut est lu par attributeChangedCallback avant l'insertion, donc
	// l'éditeur naît déjà avec le bon code.
	element.setAttribute("code", props.code);
	host.value.append(element);

	editorElement = element;
	isReady.value = true;
}

async function togglePlay() {
	error.value = null;

	if (isPlaying.value) {
		await editorElement?.editor?.stop();
		isPlaying.value = false;
		return;
	}

	if (!isReady.value) {
		isLoading.value = true;
		try {
			await loadEditor();
		} catch (cause) {
			error.value =
				"L'éditeur n'a pas pu être chargé. Vérifie ta connexion et réessaie.";
			return;
		} finally {
			isLoading.value = false;
		}
	}

	// Ce garde-fou prouve au compilateur ce qu'on sait déjà : après loadEditor(),
	// l'éditeur existe, et si l'init avait échoué on serait sorti plus haut.
	if (!editorElement?.editor) {
		return;
	}

	await editorElement.editor.evaluate();
	isPlaying.value = true;
}

// Sans ça, le scheduler continuerait de jouer alors que le composant a disparu.
onUnmounted(() => {
	editorElement?.editor?.stop();
});
</script>

<template>
	<section
		class="border-l-2 border-accent pl-6"
		:aria-labelledby="label ? headingId : undefined"
	>
		<h2
			v-if="label"
			:id="headingId"
			class="font-mono text-xs font-bold tracking-[0.16em] text-accent uppercase"
		>
			{{ label }}
		</h2>

		<!-- Avant chargement, le code reste lisible en HTML pur : quelqu'un qui ne
		     cliquera jamais voit quand même de quoi on parle.
		     `repl-code` empêche le filet d'accent de .prose-cours pre de s'ajouter
		     à celui de la section quand le REPL est dans une page de cours. -->
		<pre
			v-if="!isReady"
			class="repl-code mt-4 max-w-md overflow-x-auto bg-surface px-4 py-3 font-mono text-sm"
		>{{ code }}</pre>

		<!-- L'éditeur s'insère ici, et se place lui-même après <strudel-editor>. -->
		<div ref="host" class="mt-4 empty:mt-0"></div>

		<div class="mt-5 flex flex-wrap items-center gap-4">
			<button
				type="button"
				:disabled="isLoading"
				class="rounded-xs border-b-2 border-ink/25 bg-accent px-6 py-3 font-mono text-xs font-bold tracking-[0.1em] text-ground uppercase transition-all not-disabled:hover:opacity-90 not-disabled:active:translate-y-px not-disabled:active:border-b-0 disabled:opacity-50"
				@click="togglePlay"
			>
				{{ isLoading ? "Chargement…" : isPlaying ? "Stop" : "Play" }}
			</button>

			<!-- Le témoin n'existe que pendant la lecture : il dit un état réel,
			     il ne fait pas joli. Voir .playhead dans global.css. -->
			<div
				v-if="isPlaying"
				class="playhead flex gap-1"
				role="status"
				aria-label="Lecture en cours"
			>
				<span class="h-2.5 w-2.5"></span>
				<span class="h-2.5 w-2.5"></span>
				<span class="h-2.5 w-2.5"></span>
				<span class="h-2.5 w-2.5"></span>
			</div>

			<span v-if="isReady" class="font-mono text-xs text-muted">
				Modifie le code, puis <kbd class="bg-surface px-1 py-0.5">Ctrl</kbd> +
				<kbd class="bg-surface px-1 py-0.5">Entrée</kbd> pour réévaluer
			</span>
			<span v-else class="font-mono text-xs text-muted">
				Le premier clic télécharge l'éditeur et les sons
			</span>
		</div>

		<p v-if="error" role="alert" class="mt-4 max-w-md text-sm text-ink">
			{{ error }}
		</p>

		<!-- Le texte d'explication vit chez l'appelant : il change d'une page à
		     l'autre, alors que les contrôles, eux, sont toujours les mêmes. -->
		<slot />
	</section>
</template>
