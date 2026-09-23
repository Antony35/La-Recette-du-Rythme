---
title: "Brève histoire du live coding — d'où vient cette pratique"
sequence: "prerequis-et-decouverte"
order: 2
durationMinutes: 15
---

Écrire du code pour faire de la musique peut sembler récent. Pourtant, les
ordinateurs participent à la composition depuis les années 1950. Ce qui change
avec le **live coding**, c'est le moment où l'on programme : on écrit et on
modifie le code **pendant que la musique joue**.

<aside class="course-fun-fact not-prose" aria-label="Le saviez-vous ?">
  <p class="course-fun-fact-label"><span aria-hidden="true">✦</span> Le saviez-vous ?</p>
  <p>Un trajet en voiture, et voilà un nouveau mot : en <strong>2011</strong>, Alex McLean et Nick Collins imaginent <strong>« algorave »</strong>, mélange d’<strong>algorithme</strong> et de <strong>rave</strong>, en route pour un concert. Le code aussi peut faire danser !</p>
  <a href="https://www.wired.com/story/algorave/">L’anecdote dans WIRED ↗</a>
</aside>

## Années 1950 — composer avec des règles

Un **algorithme**, c'est une suite d'instructions. En musique, cela peut être
aussi simple que « répéter ce rythme quatre fois, puis déplacer un accent ».
Comme dans une recette, on décrit les étapes ; leur exécution produit un résultat.

La **musique algorithmique** utilise des règles pour organiser des notes, des
durées ou des sons. L'ordinateur permet d'automatiser ces choix. En **1957**,
Lejaren Hiller et Leonard Isaacson créent ainsi l'*Illiac Suite*, une œuvre
pour quatuor à cordes composée avec l'aide d'un ordinateur à l'université de
l'Illinois. Le programme participe à la fabrication d'une partition que des
musiciens peuvent interpréter.
[L'université de l'Illinois présente cette expérience](https://blogs.illinois.edu/view/6231/464962).

On a déjà du code au service de la musique, mais pas encore du live coding :
préparer une partition par programme et modifier ce programme en concert sont
deux pratiques différentes.

## Les synthés modulaires — le son en pièces détachées

En parallèle, les **synthétiseurs modulaires** ouvrent une autre piste :
construire son son en reliant des briques, appelées **modules**. Un oscillateur
produit un son, un filtre en change la couleur, et d'autres modules font évoluer
les réglages. Les câbles dessinent le trajet : c'est le **patch**.

Imagine une note tenue qui fait « wouaaah » : un signal de commande peut faire
bouger le filtre à ta place. Les câbles transportent donc du son, mais aussi
des instructions sous forme de tensions électriques.
[Doepfer explique ce principe de commande](https://doepfer.de/a100_man/a100t_e.htm).

On retrouve un plaisir proche du live coding : créer un système, l'écouter,
puis le transformer pendant qu'il joue.

## L'Eurorack — un format pour ces briques

Les panneaux couverts de boutons et de câbles colorés que tu as peut-être vus
en concert ? Ce sont parfois des systèmes **Eurorack**, un format de synthé
modulaire. Il définit notamment les dimensions des modules et leurs connexions
d'alimentation pour les réunir dans un boîtier adapté.
[La documentation Doepfer présente ce format](https://doepfer.de/a100_man/a100m_e.htm).

**Modulaire** décrit le principe ; **Eurorack** désigne un format matériel.
C'est un peu la différence entre construire avec des briques et choisir une
gamme de briques. Et pour suivre ce cours, aucun mur de câbles à acheter :
notre terrain de jeu sera le navigateur.

## La MAO — le studio dans l'ordinateur

La **MAO**, c'est la **musique assistée par ordinateur**. Enregistrer une voix,
programmer une batterie ou assembler des boucles en font partie. Un logiciel
de studio, souvent appelé **DAW** (*Digital Audio Workstation*, ou station de
travail audio numérique), rassemble ces outils.

Exemple : tu poses une grosse caisse sur chaque temps, ajoutes une basse,
puis retires la batterie pour créer une pause. Le **séquenceur** organise les
événements dans le temps ; les effets transforment leur son.
[Le manuel d'Ableton illustre ces bases](https://www.ableton.com/en/manual/live-concepts/).

Le live coding fait lui aussi partie de la MAO : on y décrit et transforme
la musique avec du code. Câbles, blocs à l'écran ou lignes de texte : ces
approches peuvent cohabiter dans un même morceau.

## Années 2000 — programmer devient un geste de scène

Au début des années 2000, des artistes explorent la programmation en direct.
Ils lancent un motif, l'écoutent, changent une instruction et font évoluer le
morceau sans arrêter la performance. Le programme devient un instrument que
l'on transforme en jouant.

En **2004**, la communauté **TOPLAP** (Temporary Organisation for the Promotion
of Live Algorithm Programming, soit « organisation temporaire pour la promotion
de la programmation algorithmique en direct ») se forme. Son manifeste défend notamment
l'idée de montrer les écrans : le public peut voir le code qui produit la
musique et suivre ses transformations. Cette démarche rend visible une partie
des décisions de l'artiste.
[Le manifeste TOPLAP](https://tidalcycles.org/docs/around_tidal/toplap_manifesto/)
présente cette approche du concert.

Le live coding ne désigne donc pas un style musical précis. C'est une manière
de créer en direct, que l'on peut notamment retrouver dans les algoraves.

## Fin des années 2000 — TidalCycles, jouer avec les motifs

Alex McLean développe **Tidal**, aussi appelé **TidalCycles**, pour explorer
des motifs musicaux avec du code. Un motif, ou *pattern*, décrit des événements
dans le temps : par exemple, une suite de coups de batterie qui se répète.

L'intérêt est de pouvoir transformer ce motif avec peu d'instructions : le
répéter, l'accélérer ou le combiner avec un autre. On décrit une organisation
musicale, puis on la fait évoluer à l'écoute.

TidalCycles est développé en **Haskell**. Il décrit les événements musicaux et
s'appuie sur un moteur sonore pour les jouer. Dans
[son récit de la création de Tidal](https://userbase.tidalcycles.org/History_of_Tidal/en.html),
Alex McLean raconte comment l'exploration des motifs a guidé son travail.

## 2022 — Strudel, cette approche dans le navigateur

En **2022**, **Alex McLean et Felix Roos** lancent **Strudel**, une adaptation
en **JavaScript** du langage de motifs de TidalCycles. Le principe reste le
même : écrire des motifs, les écouter et les transformer en direct.
[La documentation de Strudel](https://strudel.cc/learn/getting-started/)
explique cette filiation.

Pour toi, la différence est concrète : l'éditeur fonctionne dans le navigateur.
Tu peux commencer à explorer cette manière de faire de la musique sans installer
l'environnement Haskell de TidalCycles. C'est l'outil que nous utiliserons dans
ce cours.

## Ce qu'il faut retenir

Les synthés **modulaires** relient des briques sonores ; l'**Eurorack** est un
de leurs formats matériels. La **MAO** regroupe les pratiques musicales
assistées par ordinateur, dont le live coding.

La musique algorithmique pose des **règles de composition**. Le live coding
permet de **modifier le code pendant la performance**. TidalCycles facilite
la manipulation de motifs, et Strudel rend cette approche accessible sur le web.

> Avec tes mots, explique la différence entre un programme qui prépare une
> partition et un programme que l'on modifie pendant un concert.

Dans la prochaine partie, tu prendras en main le **REPL**
(Read, Evaluate, Print, Loop : lire, évaluer, afficher, recommencer) : l'espace où tu vas
écrire, lancer, écouter et recommencer.
