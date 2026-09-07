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

Gestionnaire de paquets : **pnpm** (Node >= 24, déclaré dans `.nvmrc` et
`engines`). La CI lit `.nvmrc` via `node-version-file` : une seule source de
vérité pour la version de Node.

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

**Les trois fonctions sont génériques**, et ça n'est pas décoratif : les types
`Sequence` et `Part` déclarent le *minimum* nécessaire au tri, pas la forme d'une
entrée. Sans génériques, `flattenCourse` rendrait des `Part` et `part.data.title`
ne compilerait plus dans les pages, alors que la donnée est bien là. Avec, on
passe des `CollectionEntry<"parts">` et on récupère des `CollectionEntry<"parts">`.

**`getNeighbours` rend `P | undefined`**, type écrit à la main. Aux deux
extrémités du cours l'index sort du tableau, mais TypeScript type `parts[i - 1]`
comme `P` (`noUncheckedIndexedAccess` n'est pas activé) : sans annotation
explicite, `previous.data.title` compile et casse sur la première page. Et pas
de `.at()` pour l'écrire plus court — `.at(-1)` renvoie le *dernier* élément.

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

### Style : la direction « Grille »

Tout le système de design tient dans `src/styles/global.css`. Un rythme est une
grille de pulsations : filets verticaux comme des barres de mesure, alignements
stricts, aucune décoration. **Ni ombre portée, ni dégradé, ni coin arrondi**
au-delà de 2 px.

- **Les couleurs se déclarent dans `@theme`**, jamais en dur dans un composant.
  `--color-accent` engendre `text-accent`, `bg-accent`, `border-accent`. C'est le
  remplaçant du `tailwind.config.js` de la v3 ; il n'y a plus de config JS.
- **`--color-accent` est `#00807F`**, le teal `#00ADB5` de Color Hunt assombri :
  la teinte d'origine ne passe pas le contraste AA sur fond clair.
- **Le Markdown rendu** porte `class="prose prose-cours"`. `prose` vient du
  plugin typography, `prose-cours` ne fait que lui passer les couleurs du projet
  par ses variables `--tw-prose-*`. Ne pas réécrire les règles du plugin.
- **Capitales réservées aux étiquettes courtes** (« Séquence 1 », « 2 parties »).
  Un titre complet en petites capitales espacées devient illisible.
- **JetBrains Mono est auto-hébergée** dans `public/fonts/`, en deux graisses
  (400/700) sous-ensemblées au latin étendu : 187 Ko → 64 Ko. Le sous-ensemble se
  refait avec `pyftsubset` (fonttools). Pas de CDN de polices.
- Le corps de texte reste en **sans-serif système** : zéro téléchargement pour ce
  qu'on lit le plus.

Biome ne parse `@theme` et `@plugin` qu'avec `css.parser.tailwindDirectives`
activé dans `biome.json` — sans ça, `pnpm lint` échoue sur `global.css`.

### La page d'accueil

`pages/index.astro` charge et passe, `layouts/Home.astro` met en forme — même
séparation que pour les séquences et les leçons. C'est `Home.astro` qui héberge
l'îlot Strudel : le geste (« appuie sur Play ») est l'argument le plus direct du
cours, et il coûte 0 octet tant qu'on ne clique pas.

`buildCourse` et `flattenCourse` sont enfin utilisés : l'arbre alimente le
sommaire, et `flattenCourse(course)[0]` donne le point de départ réel du cours —
pas la première partie du dossier, ni celle de la première séquence si elle est
vide.

Le type des props dérive de la fonction plutôt que d'être réécrit :

```ts
type Course = ReturnType<
	typeof buildCourse<CollectionEntry<"sequences">, CollectionEntry<"parts">>
>;
```

`typeof buildCourse<…>` instancie la fonction générique avec les types réels.
Sans les paramètres, `ReturnType` retomberait sur les contraintes `Sequence` /
`Part` et perdrait titres et durées.

### En-tête, pied de page et fil d'ariane

`BaseLayout.astro` porte la coquille commune : `<header>` avec le nom du site
cliquable, `<main>`, `<footer>`. Le corps est en `flex-col` et `<main>` en
`grow` — le pied de page reste en bas sur une page courte, sans hauteur fixe ni
positionnement absolu.

`components/Breadcrumb.astro` reçoit `items: { label, href? }[]`. **Le maillon
sans `href` est la page courante** : pas de booléen `isCurrent` à tenir à jour
en double, et c'est lui qui porte `aria-current="page"`.

Le fil d'ariane dit *où l'on est*, pas ce qu'on lit : « Accueil / Séquence 1 /
Partie 2 ». Les titres en toutes lettres sont déjà juste en dessous ; les
répéter allongerait l'ariane sur trois lignes sans rien apprendre.

`Lesson.astro` reçoit les **entrées** `part` et `sequence`, pas une liste de
chaînes. Une liste de props qui s'allonge (`title`, `sequenceTitle`,
`sequenceId`, `sequenceOrder`…) est le signe qu'il fallait passer l'objet.
La règle « les layouts ne chargent pas de données » tient toujours : c'est la
page qui appelle `getEntry()`.

### Commentaires dans un `.astro`

Un `<!-- commentaire HTML -->` est **envoyé au navigateur** dans chaque page ;
un `// commentaire` du frontmatter disparaît au build. Les explications
destinées au code vont dans le frontmatter.

Contrôle après un `pnpm build` — il ne doit rien renvoyer :

```bash
find dist -name '*.html' -exec grep -ohE '<!--.{0,60}' {} \; \
  | grep -vE 'astro:|^<!--(\[|\])?-->'
```

Les deux exclusions sont des marqueurs de machine, pas du texte rédigé :
`<!--astro:…-->` délimite les îlots, et `<!---->` / `<!--[-->` / `<!--]-->` sont
les ancres d'hydratation des fragments Vue. Les commentaires d'un `<template>`
Vue, eux, sont bel et bien retirés en production par le compilateur.

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

`src/components/StrudelRepl.vue` enveloppe **le REPL officiel de Strudel** — le
même éditeur que sur strudel.cc : `@strudel/repl` fournit l'élément personnalisé
`<strudel-editor>`, code modifiable, coloration, surlignage des notes jouées,
`Ctrl+Entrée` pour réévaluer.

Le paquet pèse **1,8 Mo** une fois bundlé. Il est donc chargé par `await import()`
**au premier clic**, jamais par un import en tête de fichier. Deux raisons
cumulatives : le poids, et le fait qu'un import statique serait exécuté par Astro
dans Node au moment du build, où Strudel plante.
Contrôle : `grep -oE 'rel="modulepreload"[^>]*' dist/index.html` doit rester vide.

Trois pièges propres à ce composant :

- **`initAudioOnFirstClick()`** est appelé à l'import du paquet et s'abonne au
  *prochain* clic. Le nôtre est déjà passé quand l'import se termine, donc le
  composant réveille lui-même le contexte : `await getAudioContext().resume()`.
  Sans ça, l'`AudioContext` reste `suspended` et rien ne sort.
- **`<strudel-editor>` insère son éditeur en frère suivant**, pas en enfant
  (`parentElement.insertBefore(container, this.nextSibling)`). Il lui faut donc
  un conteneur parent bien à lui.
- **Les styles de l'éditeur ne peuvent pas être `scoped`** : CodeMirror est
  inséré par l'élément personnalisé, pas par Vue, donc sans attribut de portée.
  Les quelques règles d'encombrement vivent dans `global.css`.

Un `onUnmounted` coupe le scheduler, sinon le son continue après la disparition
du composant.

Le composant a besoin d'une directive `client:*` **partout** où il est utilisé,
sinon le bouton s'affiche mais reste inerte. Dans un `.astro` (`Home.astro`) il
s'importe et s'utilise directement : MDX n'a jamais été nécessaire pour ça, il
l'était uniquement parce que le contenu du cours est du Markdown. Un composant
framework inséré dans un `.md` n'est pas rendu : il faut du `.mdx`. `mdx()` est branché dans `astro.config.mjs`
et le `pattern` des deux loaders accepte `**/*.{md,mdx}` ; dans un `.mdx` le
composant doit être **importé explicitement**, rien n'est implicite comme en
`.astro`. Vérification qui tranche, sur le build et pas dans le navigateur :
`grep -c astro-island dist/…/index.html` doit renvoyer ≥ 1.

Côté Vue : `<script setup lang="ts">` (le projet est en TypeScript strict),
`ref()` pour ce qui est affiché, une variable ordinaire pour ce qui ne l'est pas
(l'élément et son éditeur), et `onUnmounted` pour couper le son.

Avant l'arrivée du REPL, un `StrudelPlayer.vue` appelait `initAudio()`,
`samples()` et `webaudioRepl()` à la main. Il jouait, mais ne permettait rien
d'éditer. Son code, très commenté, reste consultable :
`git show 88fef30:src/components/StrudelPlayer.vue`.

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

- Le contenu des parties est du remplissage (« Contenue de la partie 1… ») : la
  chaîne technique fonctionne, le cours reste à écrire.
- Le cours n'a que deux séquences dont une vide, et deux parties : les états
  limites (« à venir », « 0 partie ») sont visibles en permanence sur le site.
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