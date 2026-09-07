---
title: "Du VST à Strudel : comment le code est entré dans la musique"
sequence: "code-au-service-du-son"
order: 1
durationMinutes: 15
---

Avant d'écrire une ligne de Strudel, il faut comprendre d'où il vient. Pas par
goût de l'histoire : parce que chaque étape a résolu un problème précis, et que
Strudel hérite des quatre.

## 1996 — Le VST, ou l'instrument devient un binaire

En 1996, Steinberg publie **VST** (*Virtual Studio Technology*) avec Cubase.
L'idée tient en une phrase : un instrument ou un effet devient une bibliothèque
que le logiciel hôte charge à l'exécution.

Techniquement, c'est une interface binaire. L'hôte donne au greffon un tampon
d'échantillons et lui dit « remplis-le ». Le greffon rend des nombres.

```
hôte ──► processReplacing(entrées, sorties, nombreEchantillons)
     ◄── le tampon rempli
```

Ce qui change n'est pas le son : c'est **qui fabrique l'instrument**. Avant, un
synthétiseur était un objet vendu par un fabricant. Après, c'est du C++ que
n'importe qui peut compiler. Une communauté de développeurs se forme autour d'un
métier — la musique — qui ne leur appartenait pas.

La limite est nette : le musicien reste **client** du programmeur. Pour changer
le comportement de l'instrument, il faut recompiler.

## 1988-1997 — Max/MSP, ou le musicien branche des câbles

En parallèle, Miller Puckette développe **Max** à l'IRCAM, puis **Pure Data**.
Cycling '74 y ajoute **MSP** en 1997 pour traiter l'audio.

Le modèle change complètement : au lieu d'écrire du code, on relie des boîtes.
C'est de la **programmation par flot de données** — un graphe où le signal
descend de nœud en nœud.

```
[oscillateur] ──► [filtre] ──► [gain] ──► [sortie]
```

Retiens ce schéma. Il va revenir presque à l'identique dans le navigateur.

L'apport de Max est ailleurs que dans la technique : le musicien modifie son
instrument **pendant qu'il joue**, sans recompiler. C'est la première fois que la
frontière entre « écrire le programme » et « s'en servir » s'efface.

En 2009, Ableton et Cycling '74 sortent **Max for Live** : Max devient
directement éditable à l'intérieur d'Ableton Live. Un instrument n'est plus un
binaire opaque, c'est un patch qu'on ouvre et qu'on bricole.

## 2004-2012 — Le live coding assume le code comme instrument

Un collectif fonde **TOPLAP** en 2004 avec un manifeste dont une ligne suffit à
résumer l'intention : *« montrez-nous vos écrans »*. Le code n'est plus un moyen
caché, il devient ce que le public regarde.

Autour de cette idée, une famille d'outils :

- **SuperCollider** (James McCartney, 1996) — un langage dédié à la synthèse,
  avec un serveur audio séparé du langage. Cette séparation est importante :
  elle revient chez Strudel.
- **TidalCycles** (Alex McLean, fin des années 2000) — écrit en Haskell, il
  n'invente pas de moteur audio. Il **décrit des motifs** et les envoie à
  SuperCollider. Un langage de rythme, pas un synthétiseur.
- Les **algoraves**, à partir de 2012 : des soirées où la musique est écrite en
  direct devant le public.

TidalCycles est l'ancêtre direct de Strudel, et son idée centrale est celle qui
nous occupera toute la séquence : **séparer la description du temps de la
production du son.**

## 2022 — Strudel, ou TidalCycles sans rien installer

Strudel naît en 2022 (l'en-tête des fichiers du dépôt porte
`Copyright (C) 2022 Strudel contributors`). C'est un portage des idées de
TidalCycles en **JavaScript**, tournant dans le navigateur.

Ce qui disparaît : Haskell, l'installation, SuperCollider, la configuration
audio du système. Ce qui reste : le langage de motifs.

Et ce qui le remplace côté son, c'est le sujet de la partie suivante — le
navigateur embarque désormais son propre moteur audio.

## Ce que chaque étape a apporté

| Étape | Le problème résolu | Ce qui restait bloqué |
|---|---|---|
| VST | l'instrument devient logiciel | il faut recompiler pour le changer |
| Max/MSP | on modifie l'instrument en jouant | il faut installer un logiciel lourd |
| TidalCycles | le motif se décrit comme du code | il faut Haskell **et** SuperCollider |
| Strudel | rien à installer, un onglet suffit | *(c'est ce qu'on va explorer)* |

## Pourquoi ça nous intéresse en tant que développeurs

Ce cours n'est pas une histoire de la musique électronique. Ce qui va nous
occuper, c'est ce que Strudel **est du point de vue du logiciel** :

- une **façade** au-dessus d'une API du navigateur, avec une frontière qu'on
  peut situer précisément dans le code ;
- un **mini-langage compilé** — une chaîne de caractères devient un arbre, puis
  des événements ;
- un **ordonnanceur temps réel**, qui résout un problème que `setTimeout` ne sait
  pas résoudre.

Trois sujets d'ingénierie web, avec du son comme retour immédiat. C'est la partie
la plus agréable : quand on se trompe, on l'entend.

---

**À retenir :** l'idée que Strudel hérite de TidalCycles est la séparation entre
*décrire le temps* et *produire le son*. Tout le reste en découle.
