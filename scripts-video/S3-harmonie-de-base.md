# Vidéos S3 — Harmonie de base

Cinq vidéos courtes, de 3.2 à 3.6. La 3.1 n'a pas de vidéo : on y relance la
batterie de la séquence 2. Capture d'écran et voix off, sans visage. Premier
jet à réécrire dans votre voix : gardez le contenu et le code, changez les mots.

**Pour toutes les vidéos**

- l'éditeur vide de strudel.cc : `https://strudel.cc/#IA%3D%3D` ;
- zoom du navigateur à 150 % au moins, **5 à 6 lignes de code visibles au maximum** ;
- ne jamais couper la musique au milieu d'une démonstration ;
- chaque vidéo se termine sur l'exercice de la page, pas sur un résumé ;
- la voix dit les **noms anglais** des sons : *bass drum*, *clap*, *hi-hat*,
  jamais le code ni le français (voir l'en-tête du script S2).

**Le morceau fil rouge.** Toute la séquence mène au morceau de l'équipe, en
**ré mineur** : la batterie de la 2.4, un *pluck* en `sawtooth` et un pad en
`sine`. Chaque vidéo en ajoute une pièce. Le code final est dans la 3.6.

---

## Vidéo 3.2 — note() et les octaves (2 min 15)

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:15 | `s("bd*4")` qui tourne | Une *bass drum*, on ne peut pas la chanter. Une note, si : elle a une hauteur. |
| 0:15 → 0:40 | Taper `note("d4 e4 f4 a4")`, Play | Avec `note()`, on choisit une hauteur, et Strudel la joue avec un synthé. La lettre, c'est la note ; le chiffre, c'est l'octave. Ré, mi, fa, la : tout dans l'octave 4. |
| 0:40 → 1:00 | Taper `note("b3 c4")` | Attention : le chiffre change sur le do. `b3` puis `c4`, ce sont deux notes voisines, même si le chiffre change. |
| 1:00 → 1:30 | `note("d5 e5 f5 a5")`, `Ctrl + Entrée`, puis `d3 e3 f3 a3` | Pour jouer la même mélodie plus haut, j'ajoute 1 à chaque chiffre. Plus bas, j'en retire 1. Les lettres ne bougent pas : c'est la même mélodie, dans une autre couleur. |
| 1:30 → 2:00 | `note("d4 ~ e4 ~ f4 ~ a4 ~")`, `Ctrl + Entrée` | Et comme `s()`, `note()` comprend la mini-notation. Un silence après chaque note la rend courte, détachée. Ça s'appelle un ***pluck***, de l'anglais « pincer » : la première ligne de notre morceau. |
| 2:00 → 2:15 | Bloc de la page 3.2 | À vous : quatre notes, transposez-les, puis revenez au *pluck*. |

## Vidéo 3.3 — Les synthés natifs (3 min)

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:20 | `note("d4 ~ e4 ~ f4 ~ a4 ~")` qui tourne | Même *pluck*, quatre sons très différents. Ce qui change, c'est la forme d'onde du synthé. |
| 0:20 → 0:45 | Ajouter `.s("sine")`, `Ctrl + Entrée` | `sine`, la sinusoïde : le son le plus pur, rond, presque sans relief. Gardez-le en tête : ce sera notre pad. |
| 0:45 → 1:10 | Remplacer par `triangle` | `triangle` : doux, mais plus présent. C'est le synthé par défaut, quand on n'écrit pas de `s()`. |
| 1:10 → 1:35 | Remplacer par `square` | `square`, la carrée : creux, un peu nasillard. C'est le son des vieilles consoles de jeu. |
| 1:35 → 2:00 | Remplacer par `sawtooth` | `sawtooth`, la dent de scie : brillant, riche, un peu agressif. C'est le son de notre *pluck*. On l'adoucira en séquence 4. |
| 2:00 → 2:30 | Remplacer par `.s("<sine triangle square sawtooth>")` | Les chevrons prennent un élément différent à chaque cycle. Le nom qui s'encadre vous dit quel synthé vous entendez. |
| 2:30 → 2:50 | Taper `.s("sinus")`, `Ctrl + Entrée` | Et le piège : les noms sont en anglais. `sinus`, c'est le silence, sans aucun message. |
| 2:50 → 3:00 | Remettre `.s("sawtooth")`, puis le bloc de la page 3.3 | À vous : trois synthés sur le *pluck*, puis terminez en `sawtooth`. |

## Vidéo 3.4 — Composer avec les gammes (3 min 15)

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:15 | strudel.cc vide | Il existe une façon d'écrire une mélodie où aucune note ne peut sonner faux. |
| 0:15 → 0:45 | Taper `n("0 1 2 3 4 5 6 7").scale("D:minor")`, Play | Au lieu des notes, j'écris des numéros. `.scale()` les transforme en notes de la gamme de ré mineur. Zéro, c'est ré ; sept, c'est encore ré, une octave plus haut. |
| 0:45 → 1:10 | `n("0 ~ 1 ~ 2 ~ 4 ~").scale("D4:minor").s("sawtooth")` | Notre *pluck* : ré, mi, fa, la, ce sont les marches 0, 1, 2 et 4. Mêmes notes, autre écriture. |
| 1:10 → 1:40 | Changer `4` en `3`, puis en `6`, réévaluer, revenir à `4` | Maintenant, j'improvise. Je change un chiffre… un autre… Tout reste dans la gamme : rien ne détonne. |
| 1:40 → 2:00 | Remplacer `minor` par `major`, `Ctrl + Entrée`, puis revenir | Et un seul mot change l'ambiance : en majeur, le même *pluck* devient plus lumineux. |
| 2:00 → 2:55 | `n("[0 ~ 1 ~ 2 ~ 4 ~] <[0 ~ 1 ~ 2 ~ 4 ~] [0 ~ 5 ~ 0 ~ 4 ~]>")` | Le *pluck* du morceau dure deux cycles. La première moitié, entre crochets, ne change jamais. La seconde, entre chevrons, alterne : la même phrase, puis une réponse qui monte sur le 5, un si bémol qu'on n'a même pas eu à écrire. *(laisser entendre deux tours)* |
| 2:55 → 3:15 | Bloc de la page 3.4 | À vous : improvisez en numéros, puis gardez le *pluck* du morceau. |

## Vidéo 3.5 — Ajouter un pad (2 min 30)

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:15 | La batterie de la 3.1 qui tourne | Une batterie laisse du vide entre les coups. On va le remplir avec un pad : des accords tenus. |
| 0:15 → 0:40 | Nouvelle ligne : `n("[0,2,4]").scale("D4:minor").s("sine")` | Entre crochets, la virgule superpose les notes. Zéro, deux, quatre : une marche sur deux. Ré, fa, la, ensemble : c'est un accord. |
| 0:40 → 1:05 | Remplacer par `n("<[0,2,4] [0,2,5]>")…gain(0.3)` | Avec les chevrons, deux accords alternent, un par cycle. Le second ne change qu'une note. Synthé rond, volume réduit : la nappe reste en fond. |
| 1:05 → 1:40 | Mettre le pad dans un grand `stack()` avec la batterie, le `.bank()` à la fin : silence du pad | Je l'ajoute à la batterie… et le pad se tait. Le `.bank()` de la fin colle « RolandTR808 » devant tous les sons : le pad est devenu `RolandTR808_sine`, qui n'existe pas. |
| 1:40 → 2:15 | Remettre la batterie dans son propre `stack()` avec son `.bank()` (code 3.5 de la page) | La batterie garde donc son propre `stack()`, avec sa machine. Le pad, lui, vit à côté. *(laisser entendre)* |
| 2:15 → 2:30 | Bloc de la page 3.5 | À vous : posez le pad sous votre batterie, et réglez son volume. |

## Vidéo 3.6 — Assembler les trois couches (3 min)

Code du morceau : celui de la page 3.6. Les volumes sont ceux de l'équipe.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:20 | Le morceau complet, tous les `.gain()` retirés, qui tourne | Batterie, *pluck*, pad : tout joue, mais tout se marche dessus. Il faut mixer. |
| 0:20 → 0:50 | Commenter pad et *pluck* avec `//` | On ne règle jamais tout en même temps. D'abord la batterie seule : c'est la référence. |
| 0:50 → 1:30 | Décommenter le pad, régler `.gain(0.16)` | J'ajoute le pad, et je règle son volume : il doit remplir sans couvrir le *clap*. |
| 1:30 → 2:20 | Décommenter le *pluck*, régler `.gain(0.12)`, puis le *clap* à `0.3` et le *hi-hat* à `0.32` | Puis le *pluck* : il doit passer au-dessus. Ici, c'est le *clap* et le *hi-hat* qui le couvraient ; je les baisse plutôt que de pousser le *pluck*. |
| 2:20 → 2:45 | Baisser le volume de l'ordinateur | Dernier test : à faible volume, chaque couche doit encore s'entendre. |
| 2:45 → 3:00 | Bloc « Votre morceau » de la page 3.6 | À vous : assemblez le morceau, et gardez-le. En séquence 4, on le sculpte. |

---

**Vérifications avant chaque export**

- chaque ligne de code tapée à l'écran joue bien ce que la voix annonce ;
- sous-titres incrustés et relus (`sine`, `sawtooth`, `scale`, `gain`,
  *pluck* sont souvent mal transcrits) ;
- vidéo 3.6 : le morceau final ne sature pas (aucun `.gain()` au-dessus de 1).

Vérifié le 2026-11-05 dans le REPL du site : le morceau de la 3.6 produit,
sur deux cycles, exactement les notes et les durées du code d'origine de
l'équipe (26 notes de synthé, 20 coups de batterie), à 128 BPM.
