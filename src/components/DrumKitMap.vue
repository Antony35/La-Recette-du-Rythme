<script setup lang="ts">
import { useSoundButton } from "@/composables/useSoundButton";
import { type Drum, drums } from "@/lib/drums";

/**
 * Le schéma de batterie et sa légende sonore.
 *
 * Les numéros sont **gravés dans l'image** et la légende est du texte à côté :
 * l'image n'a donc aucune langue, se traduit et se corrige sans être retouchée,
 * et un lecteur d'écran lit la légende au lieu de buter sur un dessin.
 *
 * L'image arrive en props plutôt que d'être importée ici : un composant Vue ne
 * passe pas par le pipeline d'assets d'Astro. C'est le `.mdx` qui importe le
 * fichier et transmet ses champs.
 *
 * Et ce sont bien **trois props simples**, pas l'objet `ImageMetadata` entier :
 * passé tel quel, Astro échoue à le sérialiser pour l'hydratation (« Error
 * parsing props … t is not iterable »). L'îlot s'affiche quand même, rendu côté
 * serveur, mais reste inerte — une panne parfaitement silencieuse.
 */
defineProps<{
	/** `image.src` d'un import d'asset Astro. */
	src: string;
	width: number;
	height: number;
	/** Texte alternatif de l'image. */
	alt: string;
}>();

const { active, failed, trigger } = useSoundButton();

const press = (drum: Drum) => trigger(drum.code, { s: drum.code }, 0.6);
</script>

<template>
	<div class="not-prose my-10">
		<figure>
			<!-- Aplat `snow` fixe : le schéma est sur fond transparent et ses numéros
			     sont cernés de noir, donc il disparaîtrait en thème sombre. La
			     légende, elle, reste dehors : son texte suit le thème. -->
			<div class="rounded-3xl bg-snow p-4 sm:p-8">
				<img :src="src" :width="width" :height="height" :alt="alt" class="w-full" />
			</div>
			<figcaption class="mt-3 text-sm text-muted">
				Schéma&nbsp;:
				<a
					href="https://commons.wikimedia.org/wiki/File:Drum_set.svg"
					class="underline decoration-2 underline-offset-4"
					>Pbroks13, Wikimedia Commons</a
				>, licence
				<a
					href="https://creativecommons.org/licenses/by/3.0/"
					class="underline decoration-2 underline-offset-4"
					>CC&nbsp;BY&nbsp;3.0</a
				>.
			</figcaption>
		</figure>

		<table class="mt-8 w-full border-collapse text-left text-sm">
			<caption class="sr-only">
				Les sons de batterie de Strudel, leur numéro sur le schéma et leur nom
			</caption>
			<thead>
				<tr class="border-b-2 border-rule">
					<th scope="col" class="py-2 pr-3 font-bold tabular-nums">№</th>
					<th scope="col" class="py-2 pr-3 font-bold">Pièce</th>
					<th scope="col" class="py-2 pr-3 font-bold">Code</th>
					<th scope="col" class="py-2 font-bold">De l'anglais</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="drum in drums"
					:key="drum.code"
					class="border-b border-rule"
					:class="active === drum.code ? 'bg-lemon text-night' : ''"
				>
					<td class="py-2 pr-3 tabular-nums">{{ drum.figure ?? "—" }}</td>
					<td class="py-2 pr-3">{{ drum.french }}</td>
					<td class="py-2 pr-3">
						<!-- Le bouton est dans la cellule, pas sur la ligne entière : une
						     ligne de tableau cliquable n'est ni focalisable ni annoncée. -->
						<button
							type="button"
							class="rounded-full border-2 border-accent px-3 py-1 font-mono font-bold transition-colors hover:bg-accent hover:text-ground"
							:class="active === drum.code ? 'bg-night text-lemon' : ''"
							:aria-label="`Écouter ${drum.code}, ${drum.french}`"
							@click="press(drum)"
						>
							{{ drum.code }}
						</button>
					</td>
					<td class="py-2 italic">{{ drum.english }}</td>
				</tr>
			</tbody>
		</table>

		<p class="mt-3 text-sm text-muted">
			<template v-if="failed">
				Le son n'a pas pu être chargé. Vérifiez votre connexion, puis réessayez.
			</template>
			<template v-else>
				Cliquez un code pour l'entendre. Le premier clic télécharge les sons.
			</template>
		</p>
	</div>
</template>
