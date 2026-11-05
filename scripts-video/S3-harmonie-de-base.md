# Vidéos S3 — Harmonie de base

Cinq vidéos courtes, de 3.2 à 3.6. La 3.1 n'a pas de vidéo : on y relance le
motif de la séquence 2. Capture d'écran et voix off, sans visage. Premier jet
à réécrire dans votre voix : gardez le contenu et le code, changez les mots.

**Pour toutes les vidéos**

- l'éditeur vide de strudel.cc : `https://strudel.cc/#IA%3D%3D` ;
- zoom du navigateur à 150 % au moins, **5 à 6 lignes de code visibles au maximum** ;
- ne jamais couper la musique au milieu d'une démonstration ;
- chaque vidéo se termine sur l'exercice de la page, pas sur un résumé.

Toute la séquence est en **la mineur** : la mélodie, les accords et le morceau
final partagent les mêmes notes.

---

## Vidéo 3.2 — note() et les octaves (2 min)

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:15 | `s("bd*4")` qui tourne | Une grosse caisse, on ne peut pas la chanter. Une note, si : elle a une hauteur. |
| 0:15 → 0:40 | Taper `note("a3 c4 e4 g4")`, Play | Avec `note()`, on choisit une hauteur, et Strudel la joue avec un synthé. La lettre, c'est la note ; le chiffre, c'est l'octave. |
| 0:40 → 1:10 | Zoom sur `a3 c4` | Attention : le chiffre change sur le do, pas sur le la. Entre `a3` et `c4`, il n'y a que deux notes : la, si, do. |
| 1:10 → 1:45 | Remplacer par `note("a4 c5 e5 g5")`, `Ctrl + Entrée`, puis `a2 c3 e3 g3` | Pour jouer la même mélodie plus haut, j'ajoute 1 à chaque chiffre. Plus bas, j'en retire 1. Les lettres ne bougent pas : c'est la même mélodie, dans une autre couleur. |
| 1:45 → 2:00 | Bloc de la page 3.2 | À vous : quatre notes, puis transposez-les d'une octave. |

## Vidéo 3.3 — Les synthés natifs (3 min)

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:20 | `note("a3 c4 e4 g4")` qui tourne | Même mélodie, quatre sons très différents. Ce qui change, c'est la forme d'onde du synthé. |
| 0:20 → 0:45 | Ajouter `.s("sine")`, `Ctrl + Entrée` | `sine`, la sinusoïde : le son le plus pur, rond, presque sans relief. |
| 0:45 → 1:10 | Remplacer par `triangle` | `triangle` : doux, mais plus présent. C'est le synthé par défaut, quand on n'écrit pas de `s()`. |
| 1:10 → 1:35 | Remplacer par `square` | `square`, la carrée : creux, un peu nasillard. C'est le son des vieilles consoles de jeu. |
| 1:35 → 2:00 | Remplacer par `sawtooth` | `sawtooth`, la dent de scie : brillant, riche, un peu agressif. On l'adoucira en séquence 4. |
| 2:00 → 2:30 | Remplacer par `.s("<sine triangle square sawtooth>")` | Les chevrons prennent un élément différent à chaque cycle. Regardez le nom qui s'encadre : il vous dit quel synthé vous entendez. |
| 2:30 → 2:50 | Taper `.s("sinus")`, `Ctrl + Entrée` | Et le piège : les noms sont en anglais. `sinus`, c'est le silence, sans aucun message. |
| 2:50 → 3:00 | Bloc de la page 3.3 | À vous : rejouez votre mélodie avec trois synthés, et choisissez le sien. |

## Vidéo 3.4 — Composer avec les gammes (3 min)

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:20 | strudel.cc vide | Il existe une façon d'écrire une mélodie où aucune note ne peut sonner faux. |
| 0:20 → 0:50 | Taper `n("0 1 2 3 4 5 6 7").scale("A:minor")`, Play | Au lieu des notes, j'écris des numéros. `.scale()` les transforme en notes de la gamme de la mineur. Zéro, c'est la ; sept, c'est encore la, une octave plus haut. |
| 0:50 → 1:30 | Remplacer par `n("0 2 4 2 3 2 1 ~").scale("A4:minor").s("square")` | Maintenant, j'improvise. Je change un chiffre… *(changer `3` en `5`, réévaluer)* …un autre… Tout reste dans la gamme : rien ne détonne. |
| 1:30 → 2:00 | Ajouter un `-1` | Un numéro négatif descend sous la note de départ. |
| 2:00 → 2:35 | Remplacer `minor` par `major`, `Ctrl + Entrée` | Et un seul mot change l'ambiance : en majeur, la même mélodie devient plus lumineuse. |
| 2:35 → 3:00 | Bloc de la page 3.4 | À vous : une mélodie de huit cases, en ne changeant que les numéros. Gardez-la : c'est celle du morceau. |

## Vidéo 3.5 — Ajouter un pad (2 min)

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:15 | La rythmique de la 3.1 qui tourne | Une rythmique laisse du vide entre les coups. On va le remplir avec un pad : des accords tenus. |
| 0:15 → 0:45 | Nouvelle ligne : `note("[a2,c3,e3]")` | Entre crochets, la virgule superpose les notes. La, do, mi, ensemble : c'est un accord de la mineur. |
| 0:45 → 1:15 | Remplacer par `note("<[a2,c3,e3] [f2,a2,c3]>").s("triangle").gain(0.5)` | Avec les chevrons, deux accords alternent, un par cycle. Synthé rond, registre grave, volume à moitié : la nappe reste en fond. |
| 1:15 → 1:45 | Ajouter la ligne au `stack()` de la rythmique | Je l'ajoute comme une piste de plus. La batterie donne le mouvement, le pad donne l'ambiance. |
| 1:45 → 2:00 | Bloc de la page 3.5 | À vous : posez deux accords sous votre rythmique, et réglez leur volume. |

## Vidéo 3.6 — Assembler les trois couches (3 min)

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:20 | Le `stack()` complet, tous les `.gain()` retirés, qui tourne | Rythmique, mélodie, pad : tout joue, mais tout se marche dessus. Il faut mixer. |
| 0:20 → 0:50 | Commenter mélodie et pad avec `//` | On ne règle jamais tout en même temps. D'abord la batterie seule : c'est la référence. |
| 0:50 → 1:30 | Décommenter le pad, régler `.gain(0.5)` | J'ajoute le pad, et je règle son volume : il doit remplir sans couvrir la caisse claire. |
| 1:30 → 2:20 | Décommenter la mélodie, régler `.gain(0.3)`, baisser `hh*8` à `0.6` | Puis la mélodie : elle doit passer au-dessus. Ici, c'est le charleston qui la couvrait ; je le baisse plutôt que de pousser la mélodie. |
| 2:20 → 2:45 | Baisser le volume de l'ordinateur | Dernier test : à faible volume, chaque couche doit encore s'entendre. |
| 2:45 → 3:00 | Bloc « Votre morceau » de la page 3.6 | À vous : assemblez votre morceau, et gardez-le. En séquence 4, on le sculpte. |

---

**Vérifications avant chaque export**

- chaque ligne de code tapée à l'écran joue bien ce que la voix annonce ;
- sous-titres incrustés et relus (`sine`, `sawtooth`, `scale`, `gain` sont
  souvent mal transcrits) ;
- vidéo 3.6 : le morceau final ne sature pas (aucun `.gain()` au-dessus de 1).
