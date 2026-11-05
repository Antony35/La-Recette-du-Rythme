# Vidéos S2 — Rythme

Cinq vidéos courtes, une par sous-séance. Capture d'écran et voix off, sans
visage. Premier jet à réécrire dans votre voix : gardez le contenu et le code,
changez les mots.

**Pour toutes les vidéos**

- l'éditeur vide de strudel.cc : `https://strudel.cc/#IA%3D%3D` ;
- zoom du navigateur à 150 % au moins, **5 à 6 lignes de code visibles au maximum** ;
- ne jamais couper la musique au milieu d'une démonstration : c'est la
  démonstration du live coding elle-même ;
- chaque vidéo se termine sur l'exercice de la page, pas sur un résumé.
- la voix dit les **noms anglais** des sons : *bass drum*, *snare drum*,
  *hi-hat*, jamais le code (« hh ») ni le français (« charleston »). Le
  français n'accompagne qu'une fois chaque terme : à sa première mention dans
  le cours, et en **2.1**, que rejoignent ceux qui sautent la S1 après le test
  de positionnement. Les pages, elles, gardent les deux langues.

D'une vidéo à l'autre, c'est **le même motif qui grandit** : chaque vidéo
repart de celui où la précédente s'est arrêtée.

---

## Vidéo 2.1 — Premiers sons (2 min 35)

Même structure que la S1 : le titre d'abord, puis la démo. Sans solfège :
grave, milieu, aigu. Images dans `FYC/S2-rythme/2.1-premiers-sons/3-images/`. Police de l'éditeur
Strudel vers 40–48.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:20 | `sons-0-titre.png` | Dans cette séquence, on va parler de rythme. Pour faire un rythme, il faut assembler plusieurs sons. Prenons ceux de la batterie, que vous connaissez déjà. Commençons simple : une *bass drum*, une *snare drum* et, pour finir, un *hi-hat*. |
| 0:20 → 0:45 | `sons-1-registres.png` | Pourquoi ces trois-là ? Parce qu'ils ne se marchent pas dessus. La *bass drum*, la grosse caisse, est **grave** : c'est elle qu'on suit du pied. La *snare drum*, la caisse claire, est **au milieu**, sèche. Le *hi-hat*, le charleston, est **aigu** et court. Chacun a sa place. |
| 0:45 → 1:05 | Strudel : `s("bd")`, Play. Puis `sd`, puis `hh`, avec `Ctrl + Entrée` | Un seul son par cycle : un coup, un silence, et ça recommence. *(laisser entendre chacun deux fois)* |
| 1:05 → 1:25 | `sons-2-cycle-2.png`, puis Strudel : `s("bd sd")` | Pour en jouer plusieurs, on les sépare par un **espace**. Deux sons : chacun prend la moitié du cycle. *(laisser entendre)* |
| 1:25 → 1:50 | `sons-3-cycle-4.png`, puis Strudel : `s("bd hh sd hh")` | Avec quatre sons, chacun prend un quart. Le cycle ne s'allonge pas, il se partage. *(laisser entendre)* En anglais, ce motif est appelé un ***pattern***, il est à la base d'énormément de morceaux. |
| 1:50 → 2:05 | `sons-4-valse.png`, puis Strudel : `s("bd hh hh")` | Le nombre de temps change le style. En trois temps, c'est la **valse**. *(laisser entendre)* |
| 2:05 → 2:20 | `sons-5-techno.png`, puis Strudel : `s("bd*4")` | En quatre temps, une *bass drum* sur chaque temps : c'est la base de la **techno**. *(laisser entendre)* |
| 2:20 → 2:35 | Retour à `s("bd hh sd hh")`, puis les blocs de la page 2.1 | Pour la suite du cours, nous travaillerons uniquement sur des ***patterns*** à quatre temps, que nous ferons grandir au fil des séances. À vous : faites sonner chaque son seul, puis enchaînez-les dans votre ordre. |

Ne pas parler de 2 temps, ni de 8 ou 16 : `*8` et `*16` ne sont pas des
« temps » mais des coups plus serrés dans les 4 temps (le *hi-hat* de la
techno). Repris en 2.4.

Les sons isolés pour le montage sont dans `FYC/_commun/sons-batterie/` (`bd.wav`,
`sd.wav`, `hh.wav`) : les mêmes que ceux du site.

## Vidéo 2.2 — Mini-notation (2 min 15)

Images dans `FYC/S2-rythme/2.2-mini-notation/3-images/` : une grille par
symbole, mêmes couleurs que la 2.1, la case modifiée cerclée d'orange.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:15 | `mini-0-titre.png`, puis `mini-1-base.png` | Le code qu'on écrit entre les guillemets, c'est ce qu'on appelle la **mini-notation** : un petit langage pour décrire le temps. Chaque élément séparé par un espace occupe une case. |
| 0:15 → 0:35 | `mini-2-repete.png`, puis Strudel : `s("bd hh*2 sd hh*2")`, `Ctrl + Entrée` | On peut utiliser un astérisque pour répéter un son **dans sa case**. Ici, chaque *hi-hat* est joué deux fois au lieu d'une, sans prendre plus de place. |
| 0:35 → 0:55 | `mini-3-silence.png`, puis Strudel : `s("bd ~ sd ~")`, `Ctrl + Entrée` | Le tilde représente un **silence**. Le temps passe, mais rien ne sonne. On entend le rythme respirer. |
| 0:55 → 1:10 | Strudel : `s("~ hh ~ hh ~ hh ~ hh")`, `Ctrl + Entrée` | Le silence sert aussi à **placer** un son. Avec huit cases, chaque temps est coupé en deux : le *hi-hat* tombe entre les temps. Gardez-le en tête, il reviendra dans la batterie de notre morceau. |
| 1:10 → 1:30 | `mini-4-crochets.png`, puis Strudel : `s("bd [bd sd] sd ~")`, `Ctrl + Entrée` | Pour mettre deux sons dans le même temps, on utilise les **crochets** : chacun dure alors un demi-temps. |
| 1:30 → 2:00 | Taper `s("bd [sd")`, `Ctrl + Entrée`, montrer le message. Puis `s("zzz")` | Si vous oubliez un crochet, Strudel affiche une erreur et continue de jouer la version précédente. Avec un nom de son inconnu, aucun message : juste un silence. Pour faire simple : si Strudel se plaint, c'est la syntaxe ; s'il se tait, c'est l'orthographe. |
| 2:00 → 2:15 | Revenir à `s("bd hh*2 sd hh*2")`, puis les blocs de la page 2.2 | À vous : construisez un rythme à quatre temps avec au moins un silence. |

## Vidéo 2.3 — Changer de drum kit (2 min)

Faites un passage à blanc avant d'enregistrer : les trois machines se chargent
depuis internet au premier appel.

Vérifié le 2026-11-04 dans l'index que charge Strudel
(`felixroos/dough-samples`, `tidal-drum-machines.json`) : la TR-808, la TR-909
et la LinnDrum ont toutes `bd`, `sd` et `hh`. La TR-909 n'a pas `cb`
(la TR-808 et la LinnDrum, si). Le code de Strudel fait bien
`` s = `${bank}_${s}` ``. Images dans `FYC/S2-rythme/2.3-changer-de-drum-kit/3-images/`.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:10 | `kit-0-titre.png`, puis `s("bd hh*2 sd hh*2")` qui tourne | Jusqu'ici, on a utilisé les sons de base. Mais chaque boîte à rythmes, en anglais une ***drum machine***, a sa propre sonorité. Changeons de ***drum kit***. |
| 0:10 → 0:35 | Ajouter `.bank("RolandTR808")`, `Ctrl + Entrée` | Pour changer de *drum machine*, on ajoute la méthode **`.bank()`**, avec en paramètre le nom de la machine. Prenons la Roland TR-808, et sa *bass drum* longue et grave. *(laisser entendre)* |
| 0:35 → 1:10 | Remplacer par `RolandTR909`, puis `LinnDrum` | Essayons la 909, plus claquante, avec ses *hi-hats* métalliques. *(laisser entendre)* Puis la LinnDrum, plus proche d'une vraie batterie. *(laisser entendre)* |
| 1:10 → 1:40 | `kit-1-bank.png` | Côté code, `.bank()` ne fait que **préfixer** le nom du son : `bd` devient `RolandTR909_bd`. D'où le piège : si une machine n'a pas ce son, il disparaît, sans aucune erreur. La 909, par exemple, n'a pas de ***cowbell***, la cloche : `cb` se tait. |
| 1:40 → 2:00 | Remettre `RolandTR808`, puis le bloc de la page 2.3 | À vous : rejouez votre rythme sur trois kits, puis revenez à la 808. C'est la machine de notre morceau. |

## Vidéo 2.4 — Superposer des pistes (2 min 45)

La démo est en **techno**, comme promis en 2.1, et se termine sur la
**batterie du morceau** que la séquence 3 complète : TR-808, 128 BPM, clap sur
les temps 2 et 4, *hi-hat* entre les temps.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:35 | Nouvelle ligne : `s("bd*4, ~ sd ~ sd, hh*8")`, `Ctrl + Entrée` | Jusqu'ici, les sons se suivaient. Sur une vraie batterie, on joue le plus souvent plusieurs sons en même temps. Dans Strudel, on utilise la **virgule** pour superposer les motifs. Dans cet exemple, on se retrouve avec trois pistes, chacune avec son propre rythme. *(laisser entendre)* Une *bass drum* sur chaque temps, la *snare drum* sur les temps 2 et 4 : c'est le squelette de la **techno**. |
| 0:35 → 1:00 | Remplacer `hh*8` par `hh*16`, `Ctrl + Entrée`, puis revenir à `hh*8` | Pour donner de l'énergie, la techno ne change pas de temps : elle serre le *hi-hat*. Huit coups… *(laisser entendre)* puis seize. *(laisser entendre)* La *bass drum* et la *snare drum*, elles, n'ont pas bougé : chaque piste vit sa vie. |
| 1:00 → 1:40 | Réécrire avec `stack()`, une piste par ligne (code 1 ci-dessous) | Quand les pistes s'accumulent, on utilise la fonction **`stack()`**, « pile » en anglais, qui permet d'écrire une piste par ligne. Le résultat est le même, mais la lecture est plus simple, et on peut modifier une piste sans toucher aux autres. *(laisser entendre)* |
| 1:40 → 2:10 | Ajouter `setcpm(128 / 4)` en première ligne, `Ctrl + Entrée` | Jusqu'ici, Strudel jouait à 120 ***BPM***, *beats per minute* : 120 temps par minute. Pour changer de tempo, on écrit **`setcpm()`** en première ligne. Elle compte en cycles par minute : on divise donc le tempo par nos quatre temps. 128 divisé par 4. *(laisser entendre)* |
| 2:10 → 2:30 | `sd` → `cp`, puis `hh*8` → `~ hh ~ hh ~ hh ~ hh`, puis `.bank("RolandTR808")` après la parenthèse du `stack()` (code 2) | Dernière touche : un ***clap*** à la place de la *snare drum*, le *hi-hat* entre les temps, et toute la batterie sur la 808. *(laisser entendre)* Voilà la batterie de notre morceau. |
| 2:30 → 2:45 | Bloc de la page 2.4 | À vous : construisez-la piste par piste, puis gardez-la. La séquence 3 repart de là. |

Code 1, à taper en direct :

```js
stack(
  s("bd*4"),
  s("~ sd ~ sd"),
  s("hh*8")
)
```

Code 2, l'état final :

```js
setcpm(128 / 4)

stack(
  s("bd*4"),
  s("~ cp ~ cp"),
  s("~ hh ~ hh ~ hh ~ hh")
).bank("RolandTR808")
```

Vérifié le 2026-11-05 dans le REPL du site : tempo de 0,533 cycle par
seconde (32 par minute), un `bd` sur chaque quart, `cp` sur 1/4 et 3/4, `hh`
sur 1/8, 3/8, 5/8 et 7/8. Les trois sons existent dans la TR-808.

## Vidéo 2.5 — Les aides visuelles (2 min 45)

**Une seule idée :** quand un rythme sonne faux, on regarde le code pendant
qu'il joue. Strudel encadre chaque son au moment où il sonne, et cet
encadrement trahit l'erreur. Deux pannes, une par type d'erreur :

| Panne | On entend | On voit | La leçon |
|---|---|---|---|
| `hj` au lieu de `hh` | le *hi-hat* disparaît | `hj` s'encadre quand même | encadré mais muet = orthographe |
| un `bd` effacé au lieu d'être remplacé | le rythme boite | la *bass drum* ne s'allume plus avec le *clap* | pour retirer un coup, `~`, pas l'effacer |

Aucune des deux n'est une erreur de l'exercice de la page (faute sur `cp`,
*hi-hat* sur les temps au lieu d'entre eux) : la vidéo ne donne pas la solution.

**À coder**, en partant de la batterie du morceau, à la fin de la 2.4, une
seule ligne modifiée à la fois :

1. `"~ hh ~ hh ~ hh ~ hh"` → `"~ hj ~ hj ~ hj ~ hj"` (préparer la ligne
   fautive dans le presse-papiers et la coller), puis retour à `hh` ;
2. `bd*4` → `bd bd bd`, puis `bd bd ~ bd`.

Images dans `FYC/S2-rythme/2.5-aides-visuelles/3-images/`.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:20 | `aides-0-titre.png`, puis le `stack()` qui tourne | Un rythme qui sonne faux, on l'entend tout de suite. Savoir **où** est l'erreur, c'est plus dur, surtout avec trois pistes. Pour ça, Strudel nous aide : pendant la lecture, il **encadre** dans le code chaque son au moment où il joue. |
| 0:20 → 0:40 | Zoom sur le code qui s'allume | Pendant que ça joue, la *bass drum* s'allume sur chaque temps, le *clap* sur le 2 et le 4, le *hi-hat* entre les deux. Le code bat au rythme de la musique. |
| 0:40 → 1:00 | `hh` → `hj` sur la ligne du *hi-hat*, `Ctrl + Entrée` | Et si je fais une faute de frappe ? J'écris `hj` au lieu de `hh`. *(laisser entendre)* Le *hi-hat* a disparu, et Strudel n'affiche aucune erreur. |
| 1:00 → 1:20 | Zoom : `hj` s'encadre. Puis corriger en `hh` | Pourtant, `hj` continue de s'encadrer, quatre fois par cycle. Strudel joue bien le motif, mais il ne trouve aucun son à ce nom. D'où une règle simple : **encadré mais muet, c'est l'orthographe**. |
| 1:20 → 1:40 | `bd*4` → `bd bd bd`, `Ctrl + Entrée` | Autre cas : je veux retirer le troisième coup de *bass drum*, alors j'efface un `bd`. *(laisser entendre)* Le rythme boite. |
| 1:40 → 2:05 | `aides-1-efface.png`, puis zoom sur les encadrements | Les encadrements le montrent : la *bass drum* ne s'allume plus en même temps que le *clap*. Il ne reste que trois sons, alors ils se partagent tout le cycle : chacun prend un tiers, comme la valse de la 2.1. |
| 2:05 → 2:25 | `aides-2-silence.png`, puis `bd bd bd` → `bd bd ~ bd`, `Ctrl + Entrée` | Pour retirer un coup, on ne l'efface pas : on le **remplace par un silence**. Le tilde garde la case, et tout se réaligne. *(laisser entendre)* |
| 2:25 → 2:45 | Bloc « À réparer » de la page 2.5 | Écouter, regarder, corriger : c'est la méthode. Dans la page, une rythmique cache deux erreurs. À vous de les trouver. |

---

**Vérifications avant chaque export**

- chaque ligne de code tapée à l'écran joue bien ce que la voix annonce, en
  particulier les trois machines de `.bank()` ;
- sous-titres incrustés et relus (`bd`, `sd`, `hh`, `stack` sont souvent mal transcrits) ;
- vidéo 2.5 : aucune des deux erreurs de l'exercice de la page n'apparaît à l'écran.
