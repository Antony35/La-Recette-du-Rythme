# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!--
  ⚠️ SECTION TEMPORAIRE — « Mode binôme » ci-dessous.
  Elle décrit une façon de travailler pendant la phase d'apprentissage, pas une
  propriété du dépôt. À SUPPRIMER une fois le site terminé, en même temps que
  BUILD_AN_ASTRO_WEBSITE.md.
-->

## Mode binôme (temporaire — voir le commentaire ci-dessus)

Antony construit ce site pour monter en niveau. L'objectif n'est pas d'obtenir un
site le plus vite possible : c'est qu'il sache écrire lui-même celui d'après.

**Répartition des rôles — Antony écrit le code, Claude relit.** Ne pas prendre
la main sur une tâche qu'il est en train de faire, même si c'est plus rapide.

Boucle de relecture, dans cet ordre :

1. Il écrit le code.
2. Relecture : dire **ce qui ne va pas et pourquoi**, en pointant `fichier:ligne`.
   Donner la direction, pas la solution recopiable.
3. Il corrige.
4. Deuxième relecture. **Si c'est toujours faux, corriger directement** — et
   expliquer ce qui manquait dans l'indication précédente.

Quelques principes à tenir :

- **Toujours donner le « pourquoi ».** « Ça ne marchera pas » n'apprend rien ;
  « le frontmatter s'exécute dans Node, où `window` n'existe pas » s'applique
  ailleurs.
- **Vérifier avant d'affirmer.** Lancer `pnpm check`, `pnpm build`, `grep` dans
  `dist/`. Les faits mesurés valent mieux que les souvenirs de documentation.
- **Signaler les pièges silencieux** en priorité : îlot non hydraté, samples
  absents, `pattern` de loader trop étroit. Ce sont ceux qui coûtent des heures,
  parce qu'ils ne produisent aucune erreur.
- Ne pas élargir le périmètre sans le dire. S'il demande une correction, ne pas
  refactorer trois fichiers au passage.

**Trois documents à tenir à jour à chaque étape :**

| Fichier | Contenu | Public |
|---|---|---|
| `README.md` | ce que le projet **est** et comment y contribuer | versionné |
| `CLAUDE.md` | conventions, idiomes, écarts connus | versionné |
| `BUILD_AN_ASTRO_WEBSITE.md` | le cours : **comment** on l'a construit, et pourquoi | ignoré par git, personnel |

`BUILD_AN_ASTRO_WEBSITE.md` suit l'historique des commits, un chapitre par étape.
Toute décision d'architecture non triviale, tout piège rencontré et tout refactor
(y compris les changements d'avis) y ont leur place.

## Commandes

Gestionnaire de paquets : **pnpm** (Node >= 22.12).

```bash
pnpm dev                       # serveur de dev (http://localhost:4321)
pnpm build                     # build statique dans dist/
pnpm preview                   # prévisualiser le build
pnpm check                     # astro check — types dans les .astro et le contenu
pnpm lint                      # biome check .
pnpm lint:fix                  # biome check --write .
pnpm test                      # vitest en mode watch
pnpm test:coverage             # vitest run --coverage (couvre src/lib/**)
```

Lancer un seul test :

```bash
pnpm vitest run src/lib/course.test.ts
pnpm vitest run -t "trie les séquences par order"   # filtre par nom de test
```

## Architecture

Site de cours statique **Astro 7** + **Tailwind v4** (via le plugin Vite, pas
d'intégration Astro) + **Vue 3** (uniquement pour les îlots interactifs Strudel).

Le cours est un arbre à deux niveaux : **séquences → parties**. Une partie = une
page. Tout est piloté par le contenu ; ajouter un fichier Markdown suffit à créer
une page, son URL et sa place dans le sommaire.

### Chaîne de données
 
1. `src/content.config.ts` déclare deux collections chargées par `glob()` et
   validées par Zod. Un frontmatter invalide **fait échouer le build**.
2. Le nom de fichier fait office d'`id` et de segment d'URL (kebab-case).
3. `parts.sequence` est un `reference("sequences")` : Astro vérifie l'existence au
   build, mais le champ contient un **pointeur** `{ collection, id }`, pas les
   données. Pour la séquence elle-même : `await getEntry(part.data.sequence)`
   (et `getEntries()` pour un tableau de références). Pour un simple regroupement,
   comparer `part.data.sequence.id` suffit.
4. `src/lib/course.ts` contient la logique d'ordonnancement, volontairement
   **pure** : `buildCourse(sequences, parts)` (arbre trié), `flattenCourse(course)`
   (liste plate dans l'ordre de lecture) et `getNeighbours(flat, id)`
   (précédent/suivant, y compris à cheval sur deux séquences).

`course.ts` n'importe jamais `astro:content` — c'est ce qui rend `course.test.ts`
testable sans runtime Astro. Conserver cette séparation : les pages appellent
`getCollection()`, `lib/` ne fait que transformer des données reçues en argument.

### Routage et layouts

- `src/pages/` **ne fait que du routage** : charger les données, choisir un layout,
  passer des props. Deux routes dynamiques génèrent toutes les pages du cours
  (`cours/[sequence]/index.astro` et `cours/[sequence]/[part].astro`).
- **Un seul fichier écrit `<html>`** : `layouts/BaseLayout.astro`. `Sequence.astro`
  et `Lesson.astro` s'imbriquent dedans ; aucune page ne contient de balise de
  document.
- La mise en forme vit dans `layouts/`, jamais dans `pages/`.
- **Les layouts ne chargent pas de données** : pas de `getCollection()` dans
  `layouts/`. Un layout reçoit tout par props, sinon la même page dépend de deux
  sources de données et devient impossible à raisonner (et à tester).
- Le contenu n'est jamais écrit en `.astro` : tout le cours est en Markdown dans
  `src/content/`.

### Déploiement et `base`

Le site est servi par GitHub Pages sous `/La-Recette-du-Rythme/`, pas à la racine
d'un domaine. `site` et `base` sont réglés dans `astro.config.mjs`.

**Astro ne réécrit pas les `href`.** Tout chemin interne — liens de navigation
comme fichiers de `public/` — passe par `withBase()` (`src/lib/url.ts`), qui
préfixe avec `import.meta.env.BASE_URL`. Un chemin en dur marche en local et
donne un 404 en ligne : c'est une panne que seul le build publié révèle.
Vérification : après `pnpm build`, aucun `href`/`src` de `dist/` ne doit
commencer par `/` sans être suivi de `La-Recette-du-Rythme/`.

`withBase` prend la base en **second paramètre à valeur par défaut** plutôt que
de lire l'environnement dans son corps : la fonction reste pure vis-à-vis de ses
arguments, donc testable sans simuler un build Astro. Même principe que
`course.ts` — `lib/` ne dépend jamais du runtime Astro.

### Commentaires dans un `.astro`

Un `<!-- commentaire HTML -->` est **envoyé au navigateur** dans chaque page ;
un `// commentaire` du frontmatter disparaît au build. Les explications
destinées au code vont dans le frontmatter.

### Idiomes Astro 7 à utiliser

Ces API existent dans la version installée ; ne pas les réimplémenter à la main.

- **Types d'entrées : `CollectionEntry<"parts">` / `CollectionEntry<"sequences">`**,
  générés dans `.astro/content.d.ts`. Ne jamais redécrire à la main la forme d'une
  entrée (`{ id, data, body, rendered, filePath }`) — le type dérive du schéma Zod
  et suit ses évolutions tout seul.
- **Filtrage : `getCollection("parts", (part) => part.data.sequence.id === id)`**.
  Le second argument est un prédicat ; pas de boucle `map` + `push` pour filtrer.
- **Tri : `Array.prototype.toSorted()`** (Node >= 22), qui ne mute pas le tableau
  reçu — c'est ce que fait `byOrder` dans `lib/course.ts`.
- **Routes dynamiques :** `export const getStaticPaths = (async () => {…})
  satisfies GetStaticPaths` pour le typage des params, et
  `type Props = InferGetStaticPropsType<typeof getStaticPaths>` pour celui des
  props. Les deux types viennent de `astro`.
- **Zod :** importer `z` depuis **`astro/zod`** — c'est **Zod v4** dans Astro 7.
  `import { z } from "astro:content"` est officiellement déprécié.
  Utiliser les affinements plutôt qu'un `z.number()` nu quand le domaine l'exige
  (`z.number().int().positive()` pour `order`).
- Pas de `console.log` laissé dans le frontmatter d'une page : il s'exécute au
  build et pollue la sortie de `astro build`.

### Îlots Strudel

`src/components/StrudelPlayer.vue` illustre le pattern à respecter pour l'audio :
Strudel (`@strudel/core`, `@strudel/mini`, `@strudel/webaudio`) est chargé par
`await import()` **au premier clic**, jamais par un import en tête de fichier.
Deux raisons cumulatives : le poids (~340 Ko) et le fait qu'un import statique
serait exécuté par Astro dans Node au moment du build, où Strudel plante.
`initAudio()` doit rester dans la continuité d'un geste utilisateur, sinon
l'`AudioContext` reste `suspended`. Un `onUnmounted` coupe le scheduler.

Le composant a besoin d'une directive `client:*` dans la page qui l'utilise, sinon
le bouton s'affiche mais reste inerte. Un composant framework inséré dans un `.md`
n'est pas rendu : il faut du `.mdx`. `mdx()` est branché dans `astro.config.mjs`
et le `pattern` des deux loaders accepte `**/*.{md,mdx}` ; dans un `.mdx` le
composant doit être **importé explicitement**, rien n'est implicite comme en
`.astro`. Vérification qui tranche, sur le build et pas dans le navigateur :
`grep -c astro-island dist/…/index.html` doit renvoyer ≥ 1.

Côté Vue : `<script setup lang="ts">` (le projet est en TypeScript strict),
`ref()` pour ce qui est affiché, une variable ordinaire pour ce qui ne l'est pas
(le moteur Strudel), et `onUnmounted` pour couper le son.

## Conventions

- **Imports via l'alias `@/`** (déclaré dans `tsconfig.json`), jamais de `../..`.
- **Identifiants de code en anglais** (`parts`, `order`, `objective`,
  `durationMinutes`), **URLs et contenu en français** (`/cours/…`).
- Formatage Biome : **indentation par tabulations**, guillemets doubles, imports
  organisés automatiquement. Biome suit `.gitignore` et exclut `public/`.
- TypeScript en `astro/tsconfigs/strict`.
- Commentaires et messages d'erreur rédigés en français.

## Types des paquets sans déclarations

Les trois paquets `@strudel/*` sont du JavaScript sans types. `src/types/strudel.d.ts`
déclare **uniquement ce que le projet appelle vraiment**. En ajouter un usage
(`setCps`, `pause`…) suppose de compléter ce fichier, pas de basculer en `any`.

## Écarts connus (état au 2026-09-07)

- **Le Markdown rendu n'est pas stylé** : ni `@tailwindcss/typography`, ni `@theme`
  dans `global.css`. Les pages de cours sortent sans mise en forme.
- `lib/course.ts` expose `buildCourse`, `flattenCourse` et `getNeighbours`, testés
  et fonctionnels, mais `buildCourse`/`flattenCourse`/`getNeighbours` ne sont
  branchés sur aucune page : seul `byOrder` est utilisé. La navigation
  précédent/suivant reste à câbler dans `Lesson.astro`.
- Le contenu des parties est du remplissage (« Contenue de la partie 1… ») : la
  chaîne technique fonctionne, le cours reste à écrire.
- `Lesson.astro` porte encore ses `TODO` header/footer, et `index.astro` son
  `TODO : LANDING PAGE`.
- **Deux avis `pnpm audit` restent ouverts** (`js-yaml`, `nanoid`), tous deux
  transitifs et cantonnés au build — voir la section Sécurité ci-dessous.

## Sécurité

Le site est statique : pas de serveur, pas de formulaire, pas d'entrée
utilisateur. La surface d'attaque tient en trois points, à garder en tête.

- **Un `.mdx` est du code exécuté**, au build (Node) comme dans le navigateur.
  Une partie de cours peut importer n'importe quoi. Relire les fichiers de
  `content/` comme du code, surtout s'ils viennent de l'extérieur.
- **`samples("github:tidalcycles/dirt-samples")`** fait télécharger des sons
  depuis `raw.githubusercontent.com` par le navigateur du visiteur, au clic.
  Dépendance à un tiers, sans intégrité vérifiable ; acceptable pour un site de
  cours, à rapatrier dans `public/` le jour où ça ne l'est plus.
- **`pnpm audit` avant chaque montée de version.** Les avis transitifs qui ne
  touchent que le build (`js-yaml`, `nanoid`) ne sont pas des failles du site
  publié : rien de tout ça n'atterrit dans `dist/`. Ne pas les corriger à coups
  d'`overrides` majeurs. Les remontées **patch** sur une chaîne de dev, elles,
  sont gratuites : voir `overrides` dans `pnpm-workspace.yaml` (pnpm ≥ 10 lit les
  overrides là, pas dans `package.json`).

## Ajouter du contenu

Séquence — `src/content/sequences/<slug>.md`, corps facultatif :

```yaml
---
title: "Le code au service du son"
objective: "Situer Strudel comme façade d'une vraie API navigateur"
order: 1
---
```

Partie — `src/content/parts/<slug>.md` (ou `.mdx` si elle contient un composant),
le corps contient le cours :

```yaml
---
title: "Histoire VST → Max for Live"
sequence: "code-au-service-du-son"   # id d'une entrée de sequences/
order: 1
durationMinutes: 15                  # 15 par défaut
---
```

`order` s'écrit **sans zéro de tête** : YAML lit `01` comme de l'octal. `01`/`02`
passent par chance, `08`/`09` deviennent des chaînes et font échouer Zod au build.