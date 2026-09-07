<script setup lang="ts">
// `lang="ts"` : le projet est en TypeScript strict, les composants aussi.
// Les types des paquets @strudel/* sont déclarés dans src/types/strudel.d.ts,
// parce que ces paquets n'en fournissent aucun.
import type { WebaudioRepl } from "@strudel/webaudio";

// `import` = va chercher du code écrit ailleurs pour l'utiliser ici.
// `{ onUnmounted, ref }` = on ne prend QUE ces deux outils dans le paquet "vue"
// (les accolades = "destructuration" : je nomme précisément ce que je veux).
//   - ref          : crée une variable *réactive* (quand elle change, le HTML se redessine)
//   - onUnmounted  : permet de dire "exécute ça quand le composant disparaît de l'écran"
import { onUnmounted, ref } from "vue";

// ref(false) crée une boîte réactive contenant `false`.
// isPlaying répond à la question "est-ce que ça joue en ce moment ?".
// Dans le <script> on lit/écrit son contenu avec `.value` ; dans le <template>, Vue
// enlève le `.value` tout seul.
const isPlaying = ref(false);

// Pareil, mais pour "est-ce qu'on est en train de télécharger Strudel + les sons ?".
// Ça sert à afficher "Chargement…" et à désactiver le bouton pendant ce temps-là.
const isLoading = ref(false);

// `let` (et pas `const`) = variable qu'on va réassigner plus tard.
// Volontairement PAS un ref : le moteur Strudel n'est jamais affiché dans le HTML,
// donc le rendre réactif ne servirait à rien (et Vue irait inspecter en profondeur
// un gros objet audio pour rien).
// `null` = "la boîte existe mais elle est vide pour l'instant".
// `: WebaudioRepl | null` = le type dit exactement ça : soit le moteur, soit rien.
// C'est ce qui force TypeScript à vérifier qu'on ne l'utilise jamais avant de
// l'avoir créé.
let strudel: WebaudioRepl | null = null;

// `let` aussi : ici on stockera la fonction `s()` de Strudel, celle qui transforme
// une chaîne comme "bd*4" en pattern. On ne peut pas l'importer en haut du fichier
// (voir le commentaire dans initStrudel juste en dessous), donc on la met de côté ici.
// `typeof import(...)` = "le type de ce que ce module exporte sous le nom `s`",
// sans avoir à réécrire la signature à la main.
let s: typeof import("@strudel/core").s | null = null;

// `async function` = fonction qui contient des attentes (`await`) et qui rend donc
// une Promise. Traduction : "cette fonction prend du temps, appelle-la avec await".
// Son rôle : tout préparer UNE SEULE FOIS, au tout premier clic.
async function initStrudel() {
	// `await import("...")` = import *dynamique* : le code n'est téléchargé qu'au
	// moment où cette ligne s'exécute, donc au clic — pas au chargement de la page.
	// Deux raisons, et les deux comptent :
	//   1. Strudel pèse ~340 Ko : hors de question de l'envoyer à quelqu'un qui lit
	//      juste le cours sans jamais cliquer.
	//   2. Un `import` classique en haut du fichier serait exécuté par Astro côté
	//      serveur (dans Node) au moment de générer le HTML — et Strudel plante dans
	//      Node, il n'est fait que pour le navigateur.
	// `{ s: soundFn }` = je prends l'export nommé `s` et je le renomme `soundFn`
	// localement, pour ne pas écraser la variable `s` du dessus par accident.
	const { s: soundFn } = await import("@strudel/core");

	// `mini` = la "mini-notation", le petit langage entre guillemets de Strudel
	// ("bd*4", "bd sd", "[bd bd] sd"…). Il vit dans un paquet séparé.
	const { miniAllStrings } = await import("@strudel/mini");

	// Le paquet qui relie Strudel à la Web Audio API du navigateur :
	//   - initAudio     : allume le moteur audio
	//   - samples       : télécharge une banque de sons
	//   - webaudioRepl  : crée le "chef d'orchestre" qui joue les patterns dans le temps
	const { initAudio, samples, webaudioRepl } = await import(
		"@strudel/webaudio"
	);

	// Sans cet appel, "bd*4" resterait une bête chaîne de caractères : Strudel
	// chercherait un son nommé littéralement `bd*4`, ne le trouverait pas, et se
	// tairait sans erreur. `miniAllStrings()` dit à Strudel : "toute chaîne que tu
	// reçois, parse-la comme de la mini-notation".
	miniAllStrings();

	// Crée (ou réveille) l'AudioContext du navigateur et charge les AudioWorklets.
	// CRUCIAL : les navigateurs interdisent de démarrer du son sans un geste de
	// l'utilisateur. Comme on est ici dans la suite d'un vrai clic, c'est autorisé.
	// Appelée au chargement de la page, cette ligne donnerait un contexte "suspended".
	await initAudio();

	// Télécharge la banque de sons "Dirt-Samples" (celle de TidalCycles), qui contient
	// `bd` (bass drum), `sd`, `hh`, etc. Sans ça : aucun son ne s'appelle `bd` et le
	// pattern joue... du silence. Le préfixe "github:" est un raccourci Strudel qui
	// pointe vers raw.githubusercontent.com/tidalcycles/dirt-samples/main/strudel.json
	// `await` = on attend que l'index des sons soit arrivé avant de pouvoir jouer.
	await samples("github:tidalcycles/dirt-samples");

	// Crée le moteur qui joue les patterns : il branche la sortie audio du navigateur
	// et lit l'horloge de l'AudioContext pour rester parfaitement en rythme.
	// L'objet retourné contient notamment setPattern(), start(), stop(), setCps().
	strudel = webaudioRepl();

	// On range la fonction `s` dans la variable du haut, pour pouvoir s'en servir
	// dans togglePlay() sans avoir à réimporter Strudel à chaque clic.
	s = soundFn;
}

// La fonction appelée au clic. `async` parce qu'elle attend initStrudel().
async function togglePlay() {
	// `.value` = on regarde DANS la boîte réactive.
	// Si ça joue déjà, le clic sert à arrêter : on coupe et on sort.
	if (isPlaying.value) {
		// stop() arrête le chef d'orchestre (le son se coupe immédiatement).
		// `?.` : si isPlaying est vrai, strudel existe forcément — mais TypeScript
		// ne peut pas le déduire, et une assertion `!` mentirait au compilateur.
		strudel?.stop();
		isPlaying.value = false;
		// `return` = on quitte la fonction ici, le reste ne s'exécute pas.
		return;
	}

	// `!strudel` = "si strudel est encore null", donc si c'est le tout premier clic.
	if (!strudel) {
		// On passe en mode chargement → le bouton affiche "Chargement…" et se désactive.
		isLoading.value = true;
		// try/finally : quoi qu'il arrive (succès OU erreur réseau), le `finally`
		// s'exécute — sinon un échec de téléchargement laisserait le bouton bloqué
		// sur "Chargement…" pour toujours.
		try {
			await initStrudel();
		} finally {
			isLoading.value = false;
		}
	}

	// Après initStrudel(), les deux sont renseignés — et si l'init avait échoué,
	// l'exception serait déjà remontée. Ce garde-fou ne sert donc qu'à prouver à
	// TypeScript ce qu'on sait déjà : il ne narrow pas une variable de module à
	// travers un appel de fonction.
	if (!strudel || !s) {
		return;
	}

	// Le cœur du truc :
	//   s("bd*4")  → un pattern : le son `bd`, joué 4 fois par cycle (`*4` = répète).
	//   setPattern(pattern, true) → donne le pattern au moteur ; le `true` signifie
	//   "et démarre tout de suite" (sans lui, il faudrait appeler strudel.start()).
	// C'est une fonction async, d'où le `await`.
	await strudel.setPattern(s("bd*4"), true);

	isPlaying.value = true;
}

// Astro/Vue peuvent retirer ce composant de la page (navigation, changement de vue…).
// Sans ce garde-fou, le scheduler continuerait à jouer dans le vide : le son
// resterait alors que le bouton a disparu.
// `strudel?.stop()` : le `?.` (optional chaining) veut dire "n'appelle stop() que si
// strudel n'est ni null ni undefined" — cas où l'utilisateur n'a jamais cliqué.
onUnmounted(() => {
	strudel?.stop();
});
</script>

<template>
	<!-- @click="togglePlay" : le raccourci Vue de v-on:click. C'est CETTE ligne qui
	     n'existera jamais côté navigateur si tu oublies la directive client:* dans
	     la page .astro — le bouton s'afficherait, mais serait totalement inerte. -->
	<!-- :disabled="isLoading" : le `:` est le raccourci de v-bind. Sans les deux
	     points, on passerait le texte "isLoading" en dur ; avec, Vue évalue la
	     variable. Le bouton se désactive donc pendant le téléchargement. -->
	<button
		type="button"
		:disabled="isLoading"
		class="rounded-xs bg-accent px-5 py-2.5 font-mono text-xs font-bold tracking-[0.1em] text-ground uppercase transition-opacity not-disabled:hover:opacity-85 disabled:opacity-50"
		@click="togglePlay"
	>
		<!-- {{ }} = interpolation : Vue remplace ça par la valeur de l'expression.
		     Ternaire imbriqué qui se lit : si ça charge → "Chargement…",
		     sinon si ça joue → "Stop", sinon → "Play". -->
		{{ isLoading ? "Chargement…" : isPlaying ? "Stop" : "Play" }}
	</button>
</template>