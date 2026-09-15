# La Recette du Rythme

> Créer de la musique sur le web avec Strudel — un cours de live coding en
> JavaScript, en huit séquences et quinze heures.

Site de cours statique construit avec **Astro**, **Tailwind CSS v4** et **Vue**
(réservé aux îlots interactifs autour de Strudel).

Le cours est découpé en **séquences**, elles-mêmes découpées en **parties**.
Une partie correspond à une page de cours.

## Démarrage

**Node >= 24** (`nvm use` lit le `.nvmrc`) et **pnpm** — la version est fixée par
le champ `packageManager` de `package.json`, corepack l'installe tout seul.

```bash
pnpm install   # installer les dépendances
pnpm dev       # serveur de développement (http://localhost:4321)
pnpm build     # générer le site statique dans dist/
pnpm preview   # prévisualiser le build
pnpm lint      # vérifier le formatage et le lint (Biome)
pnpm lint:fix  # corriger automatiquement ce qui peut l'être (Biome)
pnpm check     # vérifier les types des .astro et du contenu (astro check)
pnpm test      # tests unitaires en mode watch (Vitest)
pnpm test:coverage   # couverture de src/lib/
```

## Architecture des fichiers

```
src/
├── content.config.ts       schémas des collections — modèle de données du cours
├── components/
│   ├── Breadcrumb.astro    fil d'ariane
│   ├── PartQuiz.vue        îlot interactif : l'auto-évaluation de fin de partie
│   ├── PlacementTest.vue   îlot interactif : test de positionnement en trois axes
│   ├── Steps.astro         rangée de pas — une pastille par partie réelle
│   ├── StrudelRepl.vue     îlot interactif : le REPL Strudel, code éditable
│   └── VideoPlaceholder.astro  emplacement « Ici vidéo » d'une vidéo à tourner
├── content/
│   ├── sequences/          une séquence par fichier (métadonnées uniquement)
│   ├── parts/              le contenu des cours, en Markdown (.mdx si interactif)
│   ├── placement/          le test de positionnement (frontmatter seul)
│   ├── quizzes/            l'auto-évaluation d'une partie (frontmatter seul)
│   └── sources.yaml        les sources du cours, URL vérifiées
├── layouts/
│   ├── BaseLayout.astro    coquille HTML : <head>, en-tête, pied de page
│   ├── Home.astro          page d'accueil
│   ├── Sequence.astro      présentation d'une séquence et de ses parties
│   ├── Lesson.astro        présentation d'une partie de cours
│   └── Sources.astro       page des sources, groupées par rubrique
├── lib/
│   ├── course.ts           structure ordonnée du cours (arbre, liste plate, voisins)
│   ├── format.ts           durées, pluriels, titres « Titre — précision »
│   ├── levels.ts           les trois niveaux du cours et leur couleur
│   ├── placement.ts        score par axe et recommandation de parcours
│   └── url.ts              withBase() : préfixe les chemins internes
├── pages/
│   ├── index.astro         /                       accueil, sommaire par niveau
│   ├── sources.astro       /sources                sources du cours
│   └── cours/[sequence]/
│       ├── index.astro     /cours/ma-sequence      sommaire d'une séquence
│       └── [part].astro    /cours/ma-sequence/x    une page de cours
├── styles/
│   └── global.css          point d'entrée Tailwind
└── types/
    └── strudel.d.ts        types des paquets @strudel/* (qui n'en fournissent pas)
```

Quelques règles suivies dans le projet :

- **Un seul fichier écrit `<html>`** : `BaseLayout.astro`. Les autres layouts
  s'imbriquent dedans, et aucune page ne contient de balise de document.
- **`pages/` ne fait que du routage.** Les pages chargent des données, choisissent
  un layout et lui passent des props ; la mise en forme vit dans `layouts/`.
- **Les layouts ne chargent rien.** Aucun `getCollection()` dans `layouts/` : un
  layout reçoit tout par props. Sinon une même page tire ses données de deux
  endroits différents, et plus rien n'est vérifiable d'un seul coup d'œil.
- **Les types d'entrées sont générés, pas écrits.** `CollectionEntry<"parts">` et
  `CollectionEntry<"sequences">` dérivent du schéma Zod ; redécrire à la main la
  forme d'une entrée, c'est se condamner à la maintenir en double.
- **Le contenu n'est jamais écrit en `.astro`.** Tout le cours est en Markdown
  dans `content/`, et deux routes dynamiques suffisent à générer toutes les pages.
- **Les chemins d'import utilisent l'alias `@/`** (défini dans `tsconfig.json`),
  jamais de `../..`.
- **Les identifiants de code sont en anglais** (`parts`, `order`, `objective`),
  les URLs et le contenu restent en français (`/cours/…`).

## Parties interactives (`.mdx`)

Une partie de cours qui contient un composant doit être un fichier **`.mdx`** :
un `.md` recopie les balises telles quelles sans jamais les rendre, et sans
produire la moindre erreur. Trois choses doivent être vraies en même temps :

1. `mdx()` figure dans les `integrations` d'`astro.config.mjs` — l'installer ne
   suffit pas ;
2. le `pattern` du loader accepte les deux extensions (`**/*.{md,mdx}`), sinon
   le fichier renommé n'est plus ramassé et la partie disparaît du site ;
3. le composant est **importé** dans le `.mdx` — contrairement à une page
   `.astro`, rien n'est implicite.

```mdx
import StrudelRepl from "@/components/StrudelRepl.vue";

<StrudelRepl client:visible code={'s("bd*4")'} label="À toi" />
```

La directive `client:*` n'est pas optionnelle : sans elle le composant est rendu
en HTML une fois pour toutes au build, et le bouton reste inerte. La vérification
qui tranche se fait sur le build, pas dans le navigateur :

```bash
grep -c astro-island dist/cours/<sequence>/<partie>/index.html   # doit valoir ≥ 1
```

Un `.mdx` est du **code exécuté**, pas seulement du texte : il peut importer et
lancer n'importe quoi, au build comme dans le navigateur. Relire les fichiers de
`content/` comme on relit du code, en particulier s'ils viennent de l'extérieur.

## Le REPL Strudel

`src/components/StrudelRepl.vue` enveloppe **le REPL officiel de Strudel** — le
même éditeur que sur [strudel.cc](https://strudel.cc) : code modifiable,
coloration syntaxique, surlignage des notes au moment où elles sonnent, et
`Ctrl+Entrée` pour réévaluer.

```astro
<StrudelRepl client:visible code={'s("bd*4")'} label="Essaie tout de suite" />
```

Il accepte un contenu par défaut, rendu sous les contrôles — l'explication qui
accompagne l'exemple change d'une page à l'autre, pas les boutons.

**Le paquet pèse 1,8 Mo une fois bundlé.** Il n'est donc chargé qu'au premier
clic, par `await import()`. Avant ça, le code reste affiché en HTML pur : qui ne
clique jamais ne télécharge rien. Contrôle après un build — il doit rester vide :

```bash
grep -oE 'rel="modulepreload"[^>]*' dist/index.html
```

Trois pièges, tous rencontrés :

1. `initAudioOnFirstClick()` s'abonne au **prochain** clic, or le nôtre est déjà
   passé quand l'import se termine. Le composant réveille donc le contexte
   lui-même avec `getAudioContext().resume()`, sinon rien ne sort.
2. `<strudel-editor>` insère son éditeur en **frère suivant**, pas en enfant : il
   lui faut un conteneur parent dédié.
3. Les styles de l'éditeur ne peuvent pas être `scoped` — CodeMirror est inséré
   par l'élément personnalisé, pas par Vue, donc sans attribut de portée. Les
   règles d'encombrement vivent dans `global.css`.

## Style

Le système de design tient dans un seul fichier : `src/styles/global.css`.
Direction **« SKOLAE »**, inspirée de la charte de [skolae.fr](https://skolae.fr/)
et relevée dans sa feuille de styles : noir `#171717`, jaune `#FFF388`, aplats
pastel, titres en capitales condensées, coins arrondis, boutons en pilule.

Les couleurs se déclarent dans `@theme` et deviennent des classes utilitaires ;
Tailwind v4 n'a plus de fichier de configuration JavaScript.

| Jeton | Clair | Sombre | Rôle |
|---|---|---|---|
| `--color-ground` | `#FFFFFF` | `#171717` | fond |
| `--color-surface` | `#F4F4F4` | `#272727` | cartes, blocs de code |
| `--color-ink` | `#171717` | `#FFFFFF` | texte |
| `--color-muted` | `#666666` | `#AAAAAA` | texte secondaire |
| `--color-rule` | `#E6E6E6` | `#393939` | séparateurs (décoratifs) |
| `--color-accent` | `#171717` | `#FFF388` | bouton principal, liens |
| `--color-pulse` | `#C2410C` | `#FB923C` | état actif, erreur, focus |

Jetons **fixes**, identiques dans les deux thèmes : `lemon` `#FFF388`, `mint`
`#9BDEBD`, `sky` `#ABDAEE`, `lilac` `#E8C9FF`, `peach` `#EBC5B0`, `night`
`#171717`, `night-soft` `#3D3D3D`, `snow` `#FFFFFF`. Sur un aplat de marque, le
texte est toujours `night` ou `night-soft`.

Contrastes **mesurés** : texte 17,9:1 des deux côtés, secondaire 5,74:1 et
7,7:1, accent 17,9:1 et 15,7:1, pulse 5,18:1 et 7,9:1, `night` ≥ 11:1 et
`night-soft` ≥ 7:1 sur tous les pastels.

Utilitaire maison **`display-title`** pour les titres : Archivo condensée,
graisse 900, italique, capitales.

## Thème sombre

Par défaut il suit le réglage du système ; le bouton de l'en-tête permet de
forcer l'un ou l'autre, et le choix est mémorisé. **Aucune classe `dark:` dans
les composants** : les utilitaires Tailwind v4 s'écrivent `var(--color-ground)`,
donc redéfinir les jetons retourne tout le site d'un coup.

Le choix est appliqué par un `<script is:inline>` placé dans le `<head>`, donc
avant le premier rendu — sinon un flash de thème clair apparaîtrait à chaque
chargement.

Corollaire à retenir : une couleur écrite en dur dans un composant ne suivra pas
le thème. Tout passe par un jeton de `@theme`.

**Le Markdown rendu** se met en forme avec `class="prose prose-cours"` :
`prose` vient de `@tailwindcss/typography`, `prose-cours` ne fait que lui passer
les couleurs du projet via ses variables `--tw-prose-*`.

**Polices auto-hébergées** dans `public/fonts/`, licences OFL à côté, sans CDN :
Manrope (texte, 23 Ko), Archivo condensée noire italique (titres, 12 Ko — figée
depuis le fichier variable, voir CLAUDE.md), JetBrains Mono (code, 64 Ko).
SKOLAE utilise Basier Circle et GT Walsheim, commerciales : on prend les
équivalents libres qu'elle déclare elle-même en repli.

Biome ne parse `@theme` et `@plugin` qu'avec `css.parser.tailwindDirectives`
activé dans `biome.json`.

## Déploiement

Le site est publié sur GitHub Pages à chaque push sur `main`, par
`.github/workflows/deploy.yml` (build pnpm, puis publication). L'adresse en
ligne est <https://antony35.github.io/La-Recette-du-Rythme/>.

À faire **une fois** dans le dépôt : Settings → Pages → Source : *GitHub
Actions*. Tant que la source reste sur *Deploy from a branch*, le job de
déploiement échoue.

Pages sert le site sous le **sous-chemin du dépôt**, jamais à la racine du
domaine. D'où, dans `astro.config.mjs` :

```js
site: "https://antony35.github.io",
base: "/La-Recette-du-Rythme",
```

⚠️ **Aucun lien interne ne s'écrit en dur.** Astro ne réécrit pas les `href` :
un `href="/cours/…"` marche en local et donne un 404 en ligne — la panne ne se
voit qu'après publication. Tout chemin interne, **liens comme fichiers de
`public/`**, passe par le helper :

```astro
import { withBase } from "@/lib/url";

<a href={withBase(`/cours/${sequence.id}`)}>…</a>
```

Conséquence en local : `pnpm dev` sert désormais sur
`http://localhost:4321/La-Recette-du-Rythme/`, plus sur `/`.

Le contrôle qui tranche, après un `pnpm build` — il doit ne rien afficher :

```bash
grep -rhoE '(href|src)="/[^"]*"' dist --include='*.html' | grep -v '="/La-Recette-du-Rythme/'
```

## Modèle de contenu

Les collections sont déclarées et validées dans `src/content.config.ts`.
Un champ manquant ou mal typé fait échouer le build.

### `sequences/`

Le nom du fichier sert de slug d'URL et d'identifiant — le garder court et en
kebab-case. Le corps du fichier peut rester vide : une séquence ne porte que ses
métadonnées, la liste de ses parties est calculée.

```yaml
---
title: "Rythme"
objective: "Reproduire des parties rythmiques imposées avec les sons natifs"
order: 2                        # position dans le cours
level: 1                        # niveau 1, 2 ou 3
durationMinutes: 90             # durée prévue
equipment: ["Éditeur Strudel"]  # facultatif
---
```

### `parts/`

Le nom du fichier sert de slug d'URL — le garder court et en kebab-case.
Le corps du fichier contient le cours.

```yaml
---
title: "Le REPL — écrire, évaluer, entendre, recommencer"
sequence: "prerequis-et-decouverte"   # identifiant d'une entrée de sequences/, vérifié au build
order: 1                  # position dans la séquence
durationMinutes: 15       # 15 par défaut
---
```

Le champ `sequence` est une référence (`reference("sequences")`) : Astro vérifie
au build que la séquence existe. Attention, ce champ contient un **pointeur**
`{ collection, id }`, pas les données de la séquence — pour les obtenir, il faut
les résoudre avec `getEntry(part.data.sequence)` (ou `getEntries()` pour un
tableau de références).

Le `z` importé depuis `astro/zod` est **Zod v4** dans Astro 7 ; c'est le chemin
d'import à utiliser (`import { z } from "astro:content"` est déprécié).

⚠️ **Écrire `order: 1`, jamais `order: 01`.** YAML lit un entier préfixé d'un
zéro comme de l'**octal** : `01` et `02` passent (ils valent 1 et 2), mais `08`
et `09` ne sont pas de l'octal valide — la valeur devient la chaîne `"08"`, Zod
la refuse et le build casse à la neuvième partie d'une séquence.

Pour récupérer un sous-ensemble d'une collection, passer un prédicat en second
argument plutôt que de filtrer soi-même après coup :

```ts
const parts = await getCollection("parts", (part) => part.data.sequence.id === id);
```

## Ajouter une partie de cours

1. Créer un fichier dans `src/content/parts/`, nommé d'après l'URL voulue.
2. Renseigner le frontmatter ci-dessus.
3. Rédiger le cours en Markdown.

La page, son URL et sa place dans le sommaire en découlent automatiquement.
Une partie laissée avec son seul frontmatter affiche « Contenu en cours de
rédaction » : on peut poser tout le découpage avant d'écrire.

## Vidéos

Les vidéos ne sont pas encore tournées. `VideoPlaceholder.astro` en réserve la
place exacte (16/9) avec titre, durée et format de tournage :

```astro
<VideoPlaceholder title="Les pré-requis" duration="2 min 30" format="…" />
```

Emplacements : présentation du cours sur l'accueil, pré-requis sur la page de
la séquence 1.

## Sources

Page `/sources`, alimentée par `src/content/sources.yaml`. **N'ajouter une source
qu'après avoir vérifié son URL**, et renseigner `checkedAt` :

```yaml
- id: strudel-first-sounds
  title: "Workshop — First Sounds"
  url: "https://strudel.cc/workshop/first-sounds/"
  category: documentation      # documentation | switch-angel | articles | tutoriels
  author: "…"                  # facultatif
  note: "…"                    # facultatif
  checkedAt: 2026-09-15
```

Pour une vidéo YouTube, l'API oEmbed confirme qu'elle existe et donne son titre
exact :

```bash
curl -s "https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=<id>"
```
