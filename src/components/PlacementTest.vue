<script setup lang="ts">
import { computed, nextTick, ref, useId } from "vue";
import { codeSegments as segments } from "@/lib/format";
import { recommend, scoreByAxis } from "@/lib/placement";

/**
 * Test de positionnement : un score par axe, puis une recommandation de
 * parcours. Le calcul vit dans `lib/placement.ts`, testé à part ; ce composant
 * ne fait qu'afficher et collecter les réponses.
 *
 * Comme pour les quiz, les bonnes réponses sont dans le HTML : c'est un outil
 * pour se situer, pas un examen.
 */
interface Axis {
	id: string;
	label: string;
	threshold: number;
	skippable: boolean;
	advice: string;
}

interface Question {
	axis: string;
	question: string;
	options: string[];
	answer: number;
	explanation: string;
}

interface Route {
	href: string;
	label: string;
}

const props = defineProps<{
	axes: Axis[];
	questions: Question[];
	/** Continuer la séquence en cours : la sous-séquence suivante. */
	follow: Route;
	/** Sauter la séquence : la séquence suivante. */
	skip: Route;
	/** Nom de la séquence en cours, ex. « séquence 1 ». */
	sequenceLabel: string;
}>();

const uid = useId();

const chosen = ref<(number | null)[]>(props.questions.map(() => null));
const checked = ref(false);

// Référence de template : Vue y range l'élément portant `ref="resultsHeading"`,
// pour qu'on puisse lui donner le focus une fois les résultats affichés.
const resultsHeading = ref<HTMLHeadingElement | null>(null);

// Les questions sont affichées regroupées par axe, mais les réponses restent
// indexées sur la liste d'origine : c'est l'ordre que lit `scoreByAxis`.
const groups = computed(() =>
	props.axes.map((axis) => ({
		axis,
		items: props.questions
			.map((question, index) => ({ question, index }))
			.filter(({ question }) => question.axis === axis.id),
	})),
);

const answered = computed(() => chosen.value.filter((c) => c !== null).length);
const results = computed(() =>
	scoreByAxis(props.axes, props.questions, chosen.value),
);
const recommendation = computed(() => recommend(results.value));

// Les libellés viennent des données, pas du gabarit : renommer un axe dans le
// fichier de contenu ne doit pas laisser une phrase fausse ici.
const skippableLabels = new Intl.ListFormat("fr", {
	type: "conjunction",
}).format(
	props.axes.filter((axis) => axis.skippable).map((axis) => axis.label),
);

// Les libellés sont écrits pour un bouton (« Aller à… ») ; en second choix ils
// suivent « ou », donc sans majuscule.
const lowerFirst = (text: string) =>
	text.charAt(0).toLocaleLowerCase("fr") + text.slice(1);

async function check() {
	checked.value = true;
	// Les résultats apparaissent sous le formulaire : sans déplacer le focus, un
	// utilisateur de clavier ou de lecteur d'écran ne saurait pas qu'ils existent.
	await nextTick();
	resultsHeading.value?.focus();
}

function reset() {
	chosen.value = props.questions.map(() => null);
	checked.value = false;
}
</script>

<template>
	<section class="mt-16" :aria-labelledby="`${uid}-titre`">
		<h2 :id="`${uid}-titre`" class="display-title text-4xl sm:text-5xl">
			Le test
		</h2>
		<p class="mt-3 text-sm font-semibold text-muted tabular-nums">
			{{ questions.length }} questions · {{ axes.length }} axes
		</p>

		<div
			v-for="(group, g) in groups"
			:key="group.axis.id"
			class="mt-10 rounded-3xl bg-surface p-6 sm:p-10"
		>
			<h3 class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
				<span class="text-sm font-bold text-muted tabular-nums"
					>Axe {{ g + 1 }}</span
				>
				<span class="display-title text-2xl sm:text-3xl">{{
					group.axis.label
				}}</span>
			</h3>

			<ol class="mt-8 flex flex-col gap-10">
				<li v-for="{ question: item, index } in group.items" :key="index">
					<!-- fieldset + legend : la structure attendue pour un groupe de
					     boutons radio, annoncée comme telle par un lecteur d'écran. -->
					<fieldset :disabled="checked">
						<legend class="leading-snug font-bold text-balance">
							<span class="text-sm text-muted tabular-nums">{{
								String(index + 1).padStart(2, "0")
							}}</span>
							<span class="ml-3">
								<template
									v-for="(seg, s) in segments(item.question)"
									:key="s"
								>
									<code
										v-if="seg.code"
										class="rounded-md bg-ground px-1 py-0.5 font-mono text-[0.85em] font-normal"
										>{{ seg.value }}</code
									><template v-else>{{ seg.value }}</template>
								</template>
							</span>
						</legend>

						<div class="mt-4 flex flex-col gap-2">
							<label
								v-for="(option, choice) in item.options"
								:key="choice"
								class="flex cursor-pointer items-start gap-3 rounded-xl border-2 bg-ground px-4 py-3 transition-colors"
								:class="[
									checked && choice === item.answer
										? 'border-accent text-ink'
										: checked && chosen[index] === choice
											? 'border-pulse text-ink'
											: 'border-transparent text-muted hover:border-rule hover:text-ink',
								]"
							>
								<input
									v-model="chosen[index]"
									type="radio"
									:name="`${uid}-q${index}`"
									:value="choice"
									class="mt-1 accent-pulse"
								/>
								<span class="text-sm leading-relaxed">
									<template v-for="(seg, s) in segments(option)" :key="s">
										<code
											v-if="seg.code"
											class="rounded-md bg-surface px-1 py-0.5 font-mono text-[0.9em]"
											>{{ seg.value }}</code
										><template v-else>{{ seg.value }}</template>
									</template>
								</span>
								<span
									v-if="checked && choice === item.answer"
									class="ml-auto shrink-0 text-xs font-bold text-ink"
									>bonne réponse</span
								>
							</label>
						</div>
					</fieldset>

					<p
						v-if="checked"
						class="mt-4 border-l-4 py-1 pl-4 text-sm leading-relaxed text-muted"
						:class="
							chosen[index] === item.answer ? 'border-accent' : 'border-pulse'
						"
					>
						<template v-for="(seg, s) in segments(item.explanation)" :key="s">
							<code
								v-if="seg.code"
								class="rounded-md bg-ground px-1 py-0.5 font-mono text-[0.9em]"
								>{{ seg.value }}</code
							><template v-else>{{ seg.value }}</template>
						</template>
					</p>
				</li>
			</ol>
		</div>

		<div class="mt-10 flex flex-wrap items-center gap-4">
			<button
				v-if="!checked"
				type="button"
				:disabled="answered < questions.length"
				class="rounded-full bg-accent px-7 py-3 text-sm font-extrabold text-ground transition-opacity not-disabled:hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
				@click="check"
			>
				Voir mon parcours
			</button>
			<button
				v-else
				type="button"
				class="rounded-full border-2 border-ink px-7 py-3 text-sm font-extrabold transition-colors hover:bg-ink hover:text-ground"
				@click="reset"
			>
				Recommencer le test
			</button>

			<p role="status" class="text-sm font-semibold text-muted tabular-nums">
				<template v-if="!checked">
					{{ answered }} / {{ questions.length }} répondues
				</template>
			</p>
		</div>

		<div v-if="checked" class="mt-12">
			<!-- tabindex="-1" : focalisable par le script, sans entrer dans l'ordre
			     de tabulation. C'est ce qui permet d'y amener le focus. -->
			<h3
				ref="resultsHeading"
				tabindex="-1"
				class="display-title text-3xl sm:text-4xl"
			>
				Tes résultats
			</h3>

			<ul class="mt-6 grid gap-3 sm:grid-cols-3">
				<li
					v-for="result in results"
					:key="result.axis.id"
					class="rounded-xl border-2 p-5"
					:class="result.acquired ? 'border-accent' : 'border-pulse'"
				>
					<p class="text-sm font-bold">{{ result.axis.label }}</p>
					<p class="display-title mt-2 text-4xl tabular-nums">
						{{ result.score }}<span class="text-2xl text-muted"
							>/{{ result.total }}</span
						>
					</p>
					<p class="mt-2 text-sm font-semibold text-muted">
						{{ result.acquired ? "Acquis" : "À consolider" }}
					</p>
				</li>
			</ul>

			<!-- Aplat jaune dans les deux thèmes : c'est l'appel à l'action de la
			     page, comme sur la charte SKOLAE. Texte `night`, jamais `ink`. -->
			<div class="mt-6 rounded-3xl bg-lemon p-6 text-night sm:p-10">
				<p class="text-sm font-bold text-night-soft">Recommandation</p>
				<template v-if="recommendation.route === 'skip'">
					<p class="display-title mt-2 text-3xl sm:text-4xl">
						Passe directement à la suite
					</p>
					<p class="mt-3 max-w-xl leading-relaxed">
						{{ skippableLabels }} : c'est acquis. La {{ sequenceLabel }} te
						répéterait surtout ce que tu sais déjà.
					</p>
				</template>
				<template v-else>
					<p class="display-title mt-2 text-3xl sm:text-4xl">
						Suis la {{ sequenceLabel }} en entier
					</p>
					<p class="mt-3 max-w-xl leading-relaxed">
						Elle pose le vocabulaire sur lequel tout le reste du cours
						s'appuie. Une heure bien placée maintenant en fait gagner
						plusieurs ensuite.
					</p>
				</template>

				<div class="mt-6 flex flex-wrap items-center gap-3">
					<a
						:href="recommendation.route === 'skip' ? skip.href : follow.href"
						class="rounded-full bg-night px-7 py-3 text-sm font-extrabold text-lemon transition-opacity hover:opacity-85"
					>
						{{ recommendation.route === "skip" ? skip.label : follow.label }}
						→
					</a>
					<a
						:href="recommendation.route === 'skip' ? follow.href : skip.href"
						class="px-2 py-3 text-sm font-bold text-night underline decoration-2 underline-offset-4"
					>
						ou {{ lowerFirst(recommendation.route === "skip" ? follow.label : skip.label) }}
					</a>
				</div>

				<ul
					v-if="recommendation.toReview.length > 0"
					class="mt-8 flex flex-col gap-3 border-t border-night/15 pt-6"
				>
					<li
						v-for="axis in recommendation.toReview"
						:key="axis.id"
						class="text-sm leading-relaxed"
					>
						<span class="font-bold">{{ axis.label }} — </span>
						<template v-for="(seg, s) in segments(axis.advice)" :key="s">
							<code
								v-if="seg.code"
								class="rounded-md bg-night/10 px-1 py-0.5 font-mono text-[0.9em]"
								>{{ seg.value }}</code
							><template v-else>{{ seg.value }}</template>
						</template>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>
