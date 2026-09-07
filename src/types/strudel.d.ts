/**
 * Les paquets @strudel/* sont écrits en JavaScript et ne fournissent aucune
 * déclaration de types. Sans ce fichier, `import("@strudel/core")` dans un
 * fichier TypeScript déclenche une erreur `noImplicitAny` (TS7016).
 *
 * On ne décrit ici que ce que le projet utilise réellement, pas toute l'API :
 * une déclaration inventée est pire qu'une déclaration absente.
 */

declare module "@strudel/core" {
	/** Motif rythmique Strudel. Opaque : on ne fait que le passer à setPattern(). */
	export type Pattern = unknown;

	/** `s("bd*4")` → le son `bd` joué 4 fois par cycle. */
	export const s: (sound: string) => Pattern;
}

declare module "@strudel/mini" {
	/** Fait interpréter toute chaîne de caractères comme de la mini-notation. */
	export const miniAllStrings: () => void;
}

declare module "@strudel/codemirror" {
	/**
	 * L'éditeur CodeMirror de Strudel. On n'en déclare que les quatre méthodes
	 * appelées ici ; le reste de l'API est vaste et ne nous concerne pas.
	 */
	export interface StrudelMirror {
		/** Évalue le code de l'éditeur ; démarre la lecture par défaut. */
		evaluate: (autostart?: boolean) => Promise<void>;
		stop: () => Promise<void>;
		toggle: () => Promise<void>;
		setCode: (code: string) => void;
	}
}

declare module "@strudel/repl" {
	/**
	 * Ce module n'exporte rien : l'importer enregistre l'élément personnalisé
	 * <strudel-editor>. C'est un import pour son effet de bord, pas pour sa
	 * valeur — d'où l'absence de déclaration d'export.
	 */
}

declare module "@strudel/webaudio" {
	import type { Pattern } from "@strudel/core";

	/** L'AudioContext partagé par Strudel. `resume()` le sort de l'état suspendu. */
	export const getAudioContext: () => AudioContext;

	/** Crée ou réveille l'AudioContext. À appeler dans la suite d'un geste utilisateur. */
	export const initAudio: () => Promise<void>;

	/** Charge une banque de sons, ex. `samples("github:tidalcycles/dirt-samples")`. */
	export const samples: (source: string) => Promise<void>;

	export interface WebaudioRepl {
		setPattern: (pattern: Pattern, autostart?: boolean) => Promise<Pattern>;
		start: () => void;
		stop: () => void;
		pause: () => void;
		toggle: () => void;
		setCps: (cps: number) => void;
	}

	export const webaudioRepl: () => WebaudioRepl;
}
