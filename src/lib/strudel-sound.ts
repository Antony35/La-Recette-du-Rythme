/**
 * Jouer un son **ponctuel** au clic, partagé par toute la page.
 *
 * Deux choix structurants :
 *
 * 1. **`superdough()` et pas `webaudioRepl()`.** Le REPL fait tourner un motif
 *    en boucle ; ici on veut un seul coup, déclenché par un clic. `superdough`
 *    est le déclencheur bas niveau de Strudel, disponible depuis
 *    `@strudel/webaudio` qui fait `export * from "superdough"` — donc sans
 *    dépendance supplémentaire. On n'a besoin ni de `@strudel/core` ni de
 *    `@strudel/mini` : `"bd"` n'est pas de la mini-notation, c'est un nom.
 *
 * 2. **Un seul moteur pour toute la page.** L'état est au niveau du *module* :
 *    deux îlots qui importent ce fichier partagent le même `AudioContext` et le
 *    même téléchargement. Deux moteurs concurrents se disputeraient la sortie
 *    audio, et le second téléchargerait les sons pour rien.
 *
 * `createPlayer` prend son chargeur en argument au lieu de l'appeler lui-même :
 * c'est ce qui rend la logique testable sans navigateur ni Strudel. Même
 * principe que `withBase()` et sa base en second paramètre.
 */

import { withBase } from "@/lib/url";

/** Ce qu'on demande à Strudel de jouer : `{ s: "bd" }`, `{ note: "c4" }`… */
export type SoundValue = Record<string, unknown>;

/** Le minimum dont le lecteur a besoin. Strudel en fournit bien plus. */
export interface SoundEngine {
	/** Horloge du moteur audio, en secondes. */
	now: () => number;
	/** Déclenche un son à l'instant donné, pour la durée donnée. */
	trigger: (
		value: SoundValue,
		time: number,
		duration: number,
	) => void | Promise<void>;
}

/**
 * Petite avance sur l'horloge : programmer un son à `currentTime` exactement
 * laisse le navigateur le rattraper en retard, ce qui s'entend comme un clic.
 */
export const LEAD_TIME = 0.05;

/** Durée par défaut d'un son déclenché au clic, en secondes. */
export const DEFAULT_DURATION = 0.4;

export const createPlayer = (load: () => Promise<SoundEngine>) => {
	// `null` tant que personne n'a cliqué : rien n'est téléchargé à l'affichage.
	// Ensuite c'est la *promesse* qu'on mémorise, pas le moteur : deux clics
	// rapprochés attendent le même chargement au lieu d'en lancer deux.
	let ready: Promise<SoundEngine> | null = null;

	return {
		/** `true` dès qu'un chargement a été lancé — pour afficher « Chargement… ». */
		get started() {
			return ready !== null;
		},

		async play(value: SoundValue, duration = DEFAULT_DURATION) {
			ready ??= load();

			let engine: SoundEngine;
			try {
				engine = await ready;
			} catch (error) {
				// Un chargement raté ne doit pas condamner la page : on oublie la
				// promesse rejetée pour que le clic suivant puisse réessayer.
				ready = null;
				throw error;
			}

			await engine.trigger(value, engine.now() + LEAD_TIME, duration);
		},
	};
};

/**
 * Le kit de batterie du cours, copié dans `public/samples/uzu-drumkit/`.
 *
 * C'est le kit que le REPL de Strudel charge par défaut pour `s("bd")` : la
 * carte de la 1.4 et les blocs de code jouent donc le même son. L'ancienne
 * banque (`tidalcycles/dirt-samples`) n'avait ni `rim`, ni `oh`, ni `rd` — trois
 * boutons restaient muets, sans la moindre erreur.
 *
 * Servi par le site plutôt que par `raw.githubusercontent.com` : plus de
 * dépendance à un tiers pour les sons de base. Licence Unlicense (domaine
 * public), copie dans le dossier.
 */
const DRUM_KIT = withBase("/samples/uzu-drumkit/");

/** La fonction `samples` de Strudel, réduite à ce qu'on en appelle. */
export type LoadSamples = (source: string, baseUrl?: string) => Promise<void>;

/**
 * Enregistre le kit local auprès de Strudel.
 *
 * La base est passée en second argument au lieu d'être écrite dans le
 * `strudel.json` (`_base`) : elle dépend de `base`, donc de la configuration
 * d'Astro, et passe par `withBase()` comme tout chemin interne. Strudel saurait
 * la déduire de l'URL du fichier, mais il en retire la barre finale, ce qui
 * collerait le dossier au nom du son (`uzu-drumkitbd/…`).
 *
 * `samples` est reçu en argument, et ce n'est pas que pour les tests : la page
 * contient **deux copies** de Strudel. `@strudel/repl` est publié déjà
 * assemblé, avec la sienne ; la console le signale (« @strudel/core was loaded
 * more than once »). Chaque copie a son propre registre de sons : enregistrer
 * le kit dans la nôtre ne change rien à ce que joue le REPL. Chaque appelant
 * passe donc le `samples` de la copie qu'il utilise.
 */
export const loadDrumKit = (samples: LoadSamples) =>
	samples(`${DRUM_KIT}strudel.json`, DRUM_KIT);

const loadStrudel = async (): Promise<SoundEngine> => {
	// Import dynamique, et pas en tête de fichier : Astro exécuterait celui-ci
	// dans Node au moment du build, où Strudel ne fonctionne pas.
	const {
		getAudioContext,
		initAudio,
		registerSynthSounds,
		samples,
		superdough,
	} = await import("@strudel/webaudio");

	// Dans la suite d'un vrai clic, donc le navigateur autorise le son.
	await initAudio();
	// Sans ça, `s: "triangle"` ne désigne rien et les notes restent muettes.
	registerSynthSounds();
	await loadDrumKit(samples);

	return {
		now: () => getAudioContext().currentTime,
		trigger: (value, time, duration) => superdough(value, time, duration),
	};
};

const player = createPlayer(loadStrudel);

/** Joue un son ponctuel. Le premier appel télécharge le moteur et les sons. */
export const playOnce = (value: SoundValue, duration?: number) =>
	player.play(value, duration);

export const soundStarted = () => player.started;
