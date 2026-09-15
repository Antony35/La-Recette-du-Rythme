<script setup lang="ts">
import { computed, ref, useId } from "vue";
import { codeSegments as segments } from "@/lib/format";

/**
 * Auto-évaluation de fin de partie.
 *
 * Les bonnes réponses sont dans le HTML envoyé au navigateur, et c'est
 * assumé : sur un site statique il n'y a pas de serveur pour les cacher, et
 * l'objectif est de vérifier sa compréhension, pas de noter quelqu'un.
 */
interface Question {
	question: string;
	options: string[];
	/** Index de la bonne réponse. Validé au build par le schéma Zod. */
	answer: number;
	explanation: string;
}

const props = defineProps<{ questions: Question[] }>();

// Un identifiant stable entre le rendu serveur et l'hydratation : les groupes
// de boutons radio en ont besoin, et Math.random() provoquerait une divergence.
const uid = useId();

const chosen = ref<(number | null)[]>(props.questions.map(() => null));
const checked = ref(false);

const answered = computed(() => chosen.value.filter((c) => c !== null).length);
const score = computed(
	() =>
		props.questions.filter((q, index) => chosen.value[index] === q.answer)
			.length,
);

const isCorrect = (index: number) =>
	chosen.value[index] === props.questions[index].answer;

function check() {
	checked.value = true;
}

function reset() {
	chosen.value = props.questions.map(() => null);
	checked.value = false;
}
</script>

<template>
	<section
		class="mt-16 rounded-3xl bg-surface p-6 sm:p-10"
		:aria-labelledby="`${uid}-titre`"
	>
		<h2 :id="`${uid}-titre`" class="display-title text-3xl">
			Vérifie ta compréhension
		</h2>

		<ol class="mt-8 flex flex-col gap-10">
			<li v-for="(item, index) in questions" :key="index">
				<!-- fieldset + legend : c'est la structure attendue pour un groupe de
				     boutons radio. Un <div> avec du texte ne serait pas annoncé comme
				     la question du groupe. -->
				<fieldset :disabled="checked">
					<legend class="leading-snug font-bold text-balance">
						<span class="text-sm text-muted tabular-nums">{{
							String(index + 1).padStart(2, "0")
						}}</span>
						<span class="ml-3">
							<template v-for="(seg, s) in segments(item.question)" :key="s">
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
					:class="isCorrect(index) ? 'border-accent' : 'border-pulse'"
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

		<div class="mt-10 flex flex-wrap items-center gap-4">
			<button
				v-if="!checked"
				type="button"
				:disabled="answered < questions.length"
				class="rounded-full bg-accent px-7 py-3 text-sm font-extrabold text-ground transition-opacity not-disabled:hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
				@click="check"
			>
				Vérifier
			</button>

			<button
				v-else
				type="button"
				class="rounded-full border-2 border-ink px-7 py-3 text-sm font-extrabold transition-colors hover:bg-ink hover:text-ground"
				@click="reset"
			>
				Recommencer
			</button>

			<!-- role="status" : le score change après un clic, sans rechargement.
			     Sans ça, un lecteur d'écran ne l'annoncerait jamais. -->
			<p role="status" class="text-sm font-semibold text-muted tabular-nums">
				<template v-if="checked">
					{{ score }} / {{ questions.length }}
					<template v-if="score === questions.length">
						· tout est bon
					</template>
				</template>
				<template v-else>
					{{ answered }} / {{ questions.length }} répondues
				</template>
			</p>
		</div>
	</section>
</template>
