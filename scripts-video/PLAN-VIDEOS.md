# Plan des vidéos du cours

**Une vidéo courte par sous-séance**, placée en tête de la page, juste avant le
texte. Environ **2 h 10 prévues**, pour en garder au moins 1 h 30 si les
vidéos sortent plus courtes que prévu (diction plus rapide, coupes au montage).

Le cahier des charges demande « environ 1 h 30 de vidéo », des vidéos de
**8 min au maximum**, et un contenu vidéo **différent du texte**. Les durées
ci-dessous sont des repères, à rediscuter au fil du tournage.

## La règle de chaque vidéo : montrer, pas résumer

La vidéo **fait** la partie « Comment » de la sous-séance : on tape le code, on
l'entend, on se trompe et on corrige. Le texte reste la référence qu'on relit et
porte l'exercice. Une vidéo qui annonce « dans cette partie, vous verrez… »
répéterait la page.

**Seule exception : la 1.2 (histoire).** Il n'y a pas de code à montrer : la
vidéo raconte la frise avec des images d'archives, et reprend donc en partie le
texte.

## Méthode de tournage

- **Pour l'instant, une petite vidéo à la fois** : enregistrer, monter,
  sous-titrer, exporter, intégrer. C'est en répétant ces étapes qu'on
  apprend les logiciels.
- **À partir de la S3, si les logiciels sont maîtrisés** : enregistrer une
  séquence d'une traite, puis la découper à chaque changement de sous-séance.
- Capture d'écran et voix off, sans visage ; sous-titres incrustés (Jitter).
- Zoom du navigateur à 150 % au moins, 5 à 6 lignes de code visibles au maximum.
- Un passage à blanc avant d'enregistrer, pour que les sons et `.bank()` soient
  déjà chargés.
- 8 min au maximum : au-delà, on coupe en deux vidéos.

## Liste complète

Repères de durée : **2 min** pour une notion simple, **3 min** quand il faut
comparer des sons à l'oreille, **8 min** pour un sujet complexe ou une correction.

### Hors séquence

| Vidéo | Durée | Statut |
|---|---|---|
| Présentation de l'équipe et du cours (accueil) | 2 min 45 | ✅ tournée |

### S1 — Prérequis & Découverte

| Sous-séance | Ce que la vidéo montre | Durée | Statut |
|---|---|---|---|
| 1.1 Test de positionnement | les prérequis et le test | 2 min 30 | ✅ tournée |
| 1.2 Histoire du live coding | la frise en images d'archives (exception : reprend le texte) | 1 min | ✅ tournée |
| 1.3 Le REPL | REPL expliqué, `s("bd*4")` puis `*8`, Ctrl + Entrée | 1 min 30 | ✅ tournée |
| 1.4 Notes anglaises et drum kit | les codes de batterie à l'oreille, le piège de la faute de frappe | 1 min 15 | ✅ tournée |
| 1.5 Une gamme complète | la gamme, `c4`, les hauteurs `c2`→`c7`, le dièse | 1 min 30 | ✅ tournée |

### S2 — Rythme

| Sous-séance | Ce que la vidéo montre | Durée | Statut |
|---|---|---|---|
| 2.1 Premiers sons | pourquoi `bd`, `sd`, `hh` (grave, milieu, aigu), le cycle se partage en 2 puis 4, valse en 3 temps, techno en 4 | 1 min 55 | ✅ tournée |
| 2.2 Mini-notation | `*`, `~`, `[ ]` sur un même motif ; erreur de syntaxe contre son inconnu | 2 min | script prêt |
| 2.3 Changer de drum kit | le même motif sur 808, 909 et LinnDrum | 2 min | script prêt |
| 2.4 Superposer des pistes | la virgule, puis `stack()` | 2 min 10 | script prêt |
| 2.5 Les aides visuelles | réparer deux erreurs en direct, à l'oreille et à l'œil | 2 min 45 | script prêt |

### S3 — Harmonie de base

Scripts prêts : `S3-harmonie-de-base.md`.

| Sous-séance | Ce que la vidéo montre | Durée |
|---|---|---|
| 3.1 Reprendre la rythmique | — (pas de vidéo : on relance le motif de la S2) | — |
| 3.2 `note()` et les octaves | quatre notes, puis la même suite une octave plus haut | 2 min |
| 3.3 Les synthés natifs | une mélodie, quatre formes d'onde, à l'oreille | 3 min |
| 3.4 Composer juste avec les gammes | improviser en ne changeant que les index | 3 min |
| 3.5 Ajouter un pad | deux accords tenus sous la rythmique | 2 min |
| 3.6 Assembler les trois couches | équilibrer les volumes, couche par couche | 3 min |

### S4 — Sound design

| Sous-séance | Ce que la vidéo montre | Durée |
|---|---|---|
| **4.1 et 4.2 L'enveloppe ADSR** | **sujet complexe 1** : un même son, de percussif à nappe, paramètre par paramètre (vidéo placée en 4.1, rappelée en 4.2) | 8 min |
| 4.3 Filtres passe-bas et passe-haut | balayer la fréquence de coupure pendant la lecture | 3 min |
| 4.4 Résonance | pousser la résonance, puis revenir à un réglage musical | 2 min |
| 4.5 Reverb et delay | doser l'espace sans noyer le mix | 3 min |
| 4.6 Sculpter sa musique | la musique de la S3, couche par couche | 3 min |

### S5 — Studio personnel

| Sous-séance | Ce que la vidéo montre | Durée |
|---|---|---|
| 5.1 et 5.2 Du dépôt GitHub au premier son | parcourir le pack, l'importer, déclencher un sample | 5 min |
| 5.3 Une rythmique avec ses sons | kick, snare et hi-hat refaits avec le pack | 2 min |
| 5.4 Basse et pad personnels | basse et pad dans la gamme choisie | 3 min |
| 5.5 Synthé et variation | une variation audible sur un cycle | 2 min |
| 5.6 Composer sa musique | assembler et équilibrer, en accéléré | 3 min |

### S6 — Fonctions avancées

| Sous-séance | Ce que la vidéo montre | Durée |
|---|---|---|
| 6.1 Rappel JavaScript | une fonction, ses paramètres, sa valeur de retour | 2 min |
| 6.2 Une fonction utilitaire | une suite de réglages en un seul appel | 2 min |
| **6.3 Importer sa fonction dans Strudel** | **sujet complexe 2** : du JavaScript pur à un effet appelé sur un motif qui joue | 8 min |
| 6.4 Un filtre personnalisé | un filtre paramétrable sur deux pistes | 3 min |
| 6.5 Un effet ou un outil personnel | un geste musical automatisé | 3 min |
| 6.6 Sa petite bibliothèque | regrouper et commenter trois fonctions | 2 min |

### S7 — Live coding en temps réel

| Sous-séance | Ce que la vidéo montre | Durée |
|---|---|---|
| 7.1 Les sliders | piloter un filtre au slider | 2 min |
| 7.2 Raccourcis clavier | évaluer, mettre en pause, relancer sans couper | 2 min |
| 7.3 Variations automatiques | une variation tous les quatre cycles | 3 min |
| 7.4 Construire une progression | intro, montée, drop, sortie | 3 min |
| 7.5 Transitions propres | entrer et sortir une couche sans rupture | 3 min |
| 7.6 Mini-performance | trois minutes jouées sans arrêt | 4 min |

### S8 — Validation finale

Pas de vidéo dans 8.2 à 8.4 : elles donneraient la solution du cas pratique.

| Sous-séance | Ce que la vidéo montre | Durée |
|---|---|---|
| 8.1 Lire le cahier des charges | la musique à reproduire, écoutée et décortiquée, sans le code | 3 min |
| 8.5 **Correction du cas pratique (1/2)** | rythmique, basse, pad, synthé | 8 min |
| 8.5 **Correction du cas pratique (2/2)** | fonction personnelle, filtres, effets | 8 min |
| 8.6 **Pour aller plus loin** | conclusion et ouverture | 4 min |

## Vidéos obligatoires du cahier des charges

| Exigence | Vidéo |
|---|---|
| Présentation de l'équipe | accueil ✅ |
| Présentation du cours | accueil ✅ |
| Présentation des prérequis | 1.1 ✅ |
| 2 sujets complexes | 4.1 (ADSR) et 6.3 (fonction vers Strudel) |
| Correction du cas pratique | 8.5, en deux parties |
| Conclusion « Pour aller plus loin » | 8.6 |

## Totaux

| | Vidéos | Durée prévue |
|---|---|---|
| Déjà tournées | 7 | ~12 min 30 |
| S1 et S2 (à tourner) | 4 | ~9 min |
| S3 à S5 | 15 | ~47 min |
| S6 à S8 | 16 | ~60 min |
| **Total** | **42** | **~2 h 10** |

Si toutes les vidéos sortent 25 % plus courtes que prévu, il reste environ
1 h 40 : le minimum est tenu.

**Pour le 4 décembre (S1 à S5) : 19 vidéos à tourner**, environ 56 min.

## Pour plus tard, si on est dans les temps

Un **teaser de 30 s par séquence** (8 vidéos, 4 min au total), sur la page de
chaque séquence, une fois les logiciels bien maîtrisés.
