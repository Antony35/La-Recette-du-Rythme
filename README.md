# La Recette du Rythme

> Introduction au live coding et à son histoire.

Site de cours statique construit avec **Astro**, **Tailwind CSS v4** et **Vue**
(réservé aux îlots interactifs autour de Strudel).

Le cours est découpé en **séquences**, elles-mêmes découpées en **parties**.
Une partie correspond à une page de cours.

## Démarrage

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
│   └── StrudelPlayer.vue   îlot interactif : lecteur de patterns Strudel
├── content/
│   ├── sequences/          une séquence par fichier (métadonnées uniquement)
│   └── parts/              le contenu des cours, en Markdown (.mdx si interactif)
├── layouts/
│   ├── BaseLayout.astro    coquille HTML : <head>, styles globaux
│   ├── Sequence.astro      présentation d'une séquence et de ses parties
│   └── Lesson.astro        présentation d'une partie de cours
├── lib/
│   └── course.ts           structure ordonnée du cours (arbre, liste plate, voisins)
├── pages/
│   ├── index.astro         /                       accueil, liste des séquences
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
import StrudelPlayer from "@/components/StrudelPlayer.vue";

<StrudelPlayer client:visible />
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

Les deux collections sont déclarées et validées dans `src/content.config.ts`.
Un champ manquant ou mal typé fait échouer le build.

### `sequences/`

Le nom du fichier sert de slug d'URL et d'identifiant — le garder court et en
kebab-case. Le corps du fichier peut rester vide : une séquence ne porte que ses
métadonnées, la liste de ses parties est calculée.

```yaml
---
title: "Le code au service du son"
objective: "Situer Strudel comme façade d'une vraie API navigateur"
order: 1              # position dans le cours
---
```

### `parts/`

Le nom du fichier sert de slug d'URL — le garder court et en kebab-case.
Le corps du fichier contient le cours.

```yaml
---
title: "Histoire VST → Max for Live → communauté de devs"
sequence: "ma-sequence"   # identifiant d'une entrée de sequences/, vérifié au build
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