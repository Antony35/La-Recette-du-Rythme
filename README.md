# La Recette du Rythme

> Introduction au live coding et à son histoire.

Site de cours statique construit avec **Astro**, **Tailwind CSS v4** et **Vue**
(réservé aux futures parties interactives autour de Strudel).

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
```

## Architecture des fichiers

```
src/
├── content.config.ts       schémas des collections — modèle de données du cours
├── content/
│   ├── sequences/          une séquence par fichier (métadonnées uniquement)
│   └── parts/              le contenu des cours, en Markdown
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
└── styles/
    └── global.css          point d'entrée Tailwind
```

Quelques règles suivies dans le projet :

- **Un seul fichier écrit `<html>`** : `BaseLayout.astro`. Les autres layouts
  s'imbriquent dedans, et aucune page ne contient de balise de document.
- **`pages/` ne fait que du routage.** Les pages chargent des données, choisissent
  un layout et lui passent des props ; la mise en forme vit dans `layouts/`.
- **Le contenu n'est jamais écrit en `.astro`.** Tout le cours est en Markdown
  dans `content/`, et deux routes dynamiques suffisent à générer toutes les pages.
- **Les chemins d'import utilisent l'alias `@/`** (défini dans `tsconfig.json`),
  jamais de `../..`.
- **Les identifiants de code sont en anglais** (`parts`, `order`, `objective`),
  les URLs et le contenu restent en français (`/cours/…`).

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
les résoudre avec `getEntry(part.data.sequence)`.

## Ajouter une partie de cours

1. Créer un fichier dans `src/content/parts/`, nommé d'après l'URL voulue.
2. Renseigner le frontmatter ci-dessus.
3. Rédiger le cours en Markdown.

La page, son URL et sa place dans le sommaire en découlent automatiquement.