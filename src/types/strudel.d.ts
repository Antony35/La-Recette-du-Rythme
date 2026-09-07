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

declare module "@strudel/webaudio" {
	import type { Pattern } from "@strudel/core";

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
