# Vidéos S3 — Harmonie de base

Six vidéos courtes, une par sous-séance. Capture d'écran et voix off, sans
visage. Premier jet à réécrire dans votre voix : gardez le contenu et le code,
changez les mots.

**Pour toutes les vidéos**

- l'éditeur vide de strudel.cc : `https://strudel.cc/#IA%3D%3D` ;
- zoom du navigateur à 150 % au moins, **5 à 6 lignes de code visibles au
  maximum**. Exception : les codes à plusieurs couches de la 3.5 et de la 3.6.
  Baissez le zoom juste assez pour que tout le `stack()` tienne à l'écran ;
- ne jamais couper la musique au milieu d'une démonstration : c'est la
  démonstration du live coding elle-même ;
- chaque vidéo se termine sur l'exercice de la page, pas sur un résumé ;
- la voix dit les **noms anglais** des sons : *bass drum*, *clap*, *hi-hat*,
  jamais le code (« hh ») ni le français (voir l'en-tête du script S2). Même
  règle pour *pluck* et *pad*, expliqués à leur première mention (3.2 et 3.5) ;
- la voix dit les noms de synthés et de fonctions tels qu'ils s'écrivent :
  « sine », « sawtooth », « scale », « gain ».

**Le morceau fil rouge.** Toute la séquence mène au morceau de l'équipe, en
**ré mineur** : la batterie de la 2.4, un *pluck* en `sawtooth` et un *pad* en
`sine`. Chaque vidéo en ajoute une pièce, et repart de là où la précédente
s'est arrêtée. Le code final est celui de la page 3.6.

**Images.** Même style que la S2 : fond `night`, titre jaune en Archivo, puis
des grilles ou des claviers aux couleurs des niveaux. Elles sont rangées dans
`FYC/S3-harmonie-de-base/<sous-séance>/3-images/`. Un fichier
`source/images.html` sert à les refaire. Elles seront générées une fois ces
scripts validés.

**Projets Kdenlive.** Chaque `4-montage/` contient un projet prêt : les images
sont posées sur V1 aux temps du script, avec un fondu depuis le noir et un
fondu vers le noir d'une seconde, plus un « Transformer » qui zoome lentement
de 100 à 110 %. Un **guide** marque le début de chaque ligne du tableau, avec
son texte. V2 (captures) et les pistes audio sont vides : les temps seront à
recaler sur la voix.

---

## Vidéo 3.1 — Reprendre la rythmique (2 min 15)

**Deux idées :** montrer d'abord **où mène la séquence** (le morceau final, en
ouverture), puis le geste qui servira dans toute la S3 : **couper une piste
sans l'effacer**, avec `//` puis Ctrl + /. La page ne fait pas entendre le
morceau final : la vidéo, si. Images dans
`FYC/S3-harmonie-de-base/3.1-reprendre-la-rythmique/3-images/`.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:25 | `rythmique-0-titre.png`, puis Strudel : le morceau de la 3.6 (corrigé de la page) qui tourne | Voici où on arrivera à la fin de cette séquence : un vrai morceau, avec une mélodie et des accords. *(laisser entendre)* Et tout part de la batterie construite en séquence 2. |
| 0:25 → 0:45 | Strudel : remplacer par la batterie (code 1), `Ctrl + Entrée` | Mais avant d'ajouter quoi que ce soit, on va apprendre à **vérifier** notre musique. Avec trois sons, une erreur peut s'entendre facilement. Quand on ajoute une mélodie et des accords, ça se corse. |
| 0:45 → 1:00 | `rythmique-1-grille.png` | Petit rappel de notre rythmique : huit cases, deux par temps. Une *bass drum* sur chaque temps, un *clap* avec elle sur les temps 2 et 4, et le *hi-hat* entre les deux. |
| 1:00 → 1:25 | `rythmique-2-raccourci.png`, puis Strudel : curseur sur la ligne du *clap*, Ctrl + /, `Ctrl + Entrée`. Puis Ctrl + / de nouveau, `Ctrl + Entrée` | Pour écouter une piste à part, on ne l'efface pas : on la met en **commentaire**. Deux barres obliques en début de ligne, et Strudel l'ignore. Pour aller plus vite : **Ctrl + barre oblique**, celle du pavé numérique sur un clavier AZERTY. *(laisser entendre)* Le *clap* se tait. J'enlève les barres : il revient, exactement comme avant. |
| 1:25 → 1:50 | Strudel : curseur sur la ligne du *clap*, Ctrl + /, puis sur celle du *hi-hat*, Ctrl + /, `Ctrl + Entrée` | Cette fois-ci, je coupe le *clap*, puis le *hi-hat*… *(laisser entendre)* Il ne reste que la *bass drum* : un coup sur chaque temps. |
| 1:50 → 2:05 | Zoom sur la virgule au bout de `s("bd*4"),` | Regardez la ligne de la *bass drum* : c'est maintenant la dernière, et elle garde sa virgule. Strudel l'accepte, sans erreur. On peut donc commenter n'importe quelle ligne sans toucher aux autres. |
| 2:05 → 2:15 | Bloc « Votre batterie, piste par piste » de la page 3.1 | À vous : relancez votre batterie, coupez tout sauf la *bass drum*, puis réactivez les pistes une par une. |

Code 1, la batterie de la séquence 2 :

```js
setcpm(128 / 4)

stack(
  s("bd*4"),
  s("~ cp ~ cp"),
  s("~ hh ~ hh ~ hh ~ hh")
).bank("RolandTR808")
```

**Ne pas commenter `setcpm()` à l'écran** : le bloc garderait le tempo
précédent, et ce qu'on entend ne correspondrait plus à ce qu'on lit (piège noté
dans la page 3.1).

`rythmique-1-grille.png` : la grille de la page, sur trois lignes (*bass
drum* en `mint`, *clap* en `sky`, *hi-hat* en `lilac`), avec huit cases et
les quatre temps au-dessus.

`rythmique-2-raccourci.png` : trois touches, « Ctrl », « + » et « / », puis
la ligne du *clap* avant et après le raccourci. Deux rappels : « Mac : Cmd + / »
et « AZERTY : le / du pavé numérique ».

## Vidéo 3.2 — note() et les octaves (2 min 25)

On passe du rythme à la mélodie. Les noms de notes et le chiffre d'octave sont
**un rappel de la séquence 1** (1.4 et 1.5), pas une nouveauté. Ce qui est
neuf : déplacer toute une mélodie d'une octave, et le *pluck*. Images dans
`FYC/S3-harmonie-de-base/3.2-jouer-des-hauteurs/3-images/`.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:20 | `hauteurs-0-titre.png`, puis Strudel : `s("bd*4")` qui tourne | Dans cette séquence, on passe du rythme à la mélodie. Une *bass drum*, c'est notre kick, mais on ne peut pas le chanter. Une note, si : elle a ce qu'on appelle une **hauteur**. |
| 0:20 → 0:50 | Remplacer par `note("d4 e4 f4 a4")`, `Ctrl + Entrée` | Avec **`note()`**, on ne choisit plus un son, mais une hauteur, et Strudel la joue avec un synthé. Les lettres, vous les connaissez depuis la séquence 1 : `d` pour ré, `e` pour mi, `f` pour fa, `a` pour la. Et le chiffre collé à la note, c'est l'**octave** : ici, les quatre notes sont dans l'octave 4. *(laisser entendre)* |
| 0:50 → 1:10 | `hauteurs-1-octave.png`, puis Strudel : `note("b3 c4")`, `Ctrl + Entrée` | Attention au piège : le chiffre change sur le **do**, pas sur le la. Une octave va de `c` à `b`, et la suivante recommence à `c`. Donc `b3` puis `c4`, ce n'est pas un saut : ce sont deux notes **voisines**, si puis do. *(laisser entendre)* Vous entendez : la mélodie monte d'une seule marche, sans sauter. |
| 1:10 → 1:45 | Revenir à `note("d4 e4 f4 a4")`. Puis `hauteurs-2-transposer.png`, puis Strudel : `d5 e5 f5 a5`, `Ctrl + Entrée`, puis `d3 e3 f3 a3` | En séquence 1, ce chiffre servait à refermer la gamme. Ici, il va déplacer toute une mélodie. Pour la jouer plus haut, donc plus aiguë, j'ajoute 1 à **chaque** chiffre. *(laisser entendre)* Plus bas, donc plus grave, j'en retire 1. *(laisser entendre)* Les lettres ne bougent pas : c'est la même mélodie, dans une autre couleur. Ça s'appelle **transposer**. |
| 1:45 → 2:10 | Remplacer par `note("d4 ~ e4 ~ f4 ~ a4 ~")`, `Ctrl + Entrée` | Et comme `s()`, `note()` comprend la mini-notation. Un silence après chaque note la rend courte et détachée. *(laisser entendre)* Ça s'appelle un ***pluck***, de l'anglais « pincer » : des notes pincées comme une corde. C'est la première ligne mélodique de notre morceau. |
| 2:10 → 2:25 | Bloc « Vos quatre notes » de la page 3.2 | À vous : écrivez quatre notes, transposez-les, puis revenez au *pluck* et gardez-le. |

`hauteurs-1-octave.png` : le clavier de la 1.5, réduit à `c3` → `c4`, avec
`b3` et `c4` en surbrillance côte à côte et la frontière d'octave marquée
entre elles.

`hauteurs-2-transposer.png` : le même clavier sur trois octaves, avec ré, mi,
fa et la allumés dans l'octave 3, puis 4, puis 5. Les mêmes formes se
répètent, chaque groupe sous son code (`d3 e3 f3 a3`…).

La vidéo ne parle pas des dièses ni des bémols : la 1.5 les a montrés, et la
3.4 évite d'avoir à les écrire.

## Vidéo 3.3 — Les synthés natifs (2 min 55)

Une mélodie, quatre timbres, à l'oreille. On garde le même *pluck* d'un bout à
l'autre : seul le mot dans `.s()` change. Images dans
`FYC/S3-harmonie-de-base/3.3-synthes-natifs/3-images/`.

`synthes-1-ondes.png` reprend le schéma de la page (`src/assets/Waveforms.svg`,
Omegatron, CC BY-SA 3.0) sur un fond blanc. Le crédit reste **à l'écran tant
que l'image est visible** : « Schéma : Omegatron, Wikimedia Commons, CC BY-SA
3.0 ».

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:20 | `synthes-0-titre.png`, puis Strudel : `note("d4 ~ e4 ~ f4 ~ a4 ~")` qui tourne | Voici notre *pluck*. Une même mélodie peut sonner douce comme une flûte ou criarde comme une alarme. Les notes ne changent pas : c'est le **timbre** qui change. Dans Strudel, il se choisit en un mot. |
| 0:20 → 0:45 | `synthes-1-ondes.png` | Un synthé fabrique son son à partir d'une **forme d'onde**, qui se répète très vite. Sa forme décide du caractère du son. Une onde lisse donne un son rond ; plus elle a d'angles, plus le son est brillant. |
| 0:45 → 1:05 | Strudel : ajouter `.s("sine")`, `Ctrl + Entrée` | Le synthé se passe en paramètre de la méthode `.s()`, comme un son de batterie. `sine`, la sinusoïde : le son le plus pur, rond, presque sans relief. *(laisser entendre)* Gardez-le en tête : ce sera notre *pad*. |
| 1:05 → 1:20 | Remplacer par `triangle` | Le `triangle` : doux, mais plus présent que `sine`. D'ailleurs, c'est le synthé par défaut, celui que vous entendiez quand on n'écrivait pas de `s()`. *(laisser entendre)* |
| 1:20 → 1:40 | Remplacer par `square` | Le `square`, la carrée : creux, un peu nasillard. *(laisser entendre)* Si ça vous rappelle un jeu vidéo, c'est normal : la console NES de Nintendo jouait ses mélodies avec des ondes carrées. |
| 1:40 → 2:00 | Remplacer par `sawtooth` | Le `sawtooth`, la dent de scie : brillant, riche, un peu agressif. *(laisser entendre)* C'est le son de notre *pluck* : il doit ressortir au-dessus de la batterie. On l'adoucira en séquence 4. |
| 2:00 → 2:20 | Remplacer par `.s("<sine triangle square sawtooth>")`, `Ctrl + Entrée`. Zoom sur le nom qui s'encadre | Pour comparer, les **chevrons** prennent un élément différent à chaque cycle. Le nom qui s'encadre vous dit quel synthé vous entendez. *(laisser entendre les quatre cycles)* |
| 2:20 → 2:40 | Remplacer par `.s("sinus")`, `Ctrl + Entrée`. Zoom : `sinus` s'encadre | Attention : Strudel ne connaît que les noms anglais. J'écris `sinus`… silence, et aucun message. Comme en 2.5 : encadré mais muet, c'est l'orthographe. |
| 2:40 → 2:55 | Remettre `.s("sawtooth")`, puis le bloc « Le pluck, synthé par synthé » de la page 3.3 | À vous : jouez le *pluck* avec différents synthés, puis terminez sur `sawtooth` : c'est lui qu'on garde pour la suite. |

État final, à garder pour la 3.4 :

```js
note("d4 ~ e4 ~ f4 ~ a4 ~").s("sawtooth")
```

## Vidéo 3.4 — Composer avec les gammes (3 min 15)

**Une seule idée :** on n'écrit plus les notes, on écrit leur **numéro** dans
une gamme, et aucune note ne peut sonner faux. Sans solfège : une gamme est
présentée comme **un choix de 7 touches parmi 12**. Images dans
`FYC/S3-harmonie-de-base/3.4-composer-avec-les-gammes/3-images/`.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:15 | `gammes-0-titre.png` | Si, comme moi, vous n'êtes pas un maestro, vous risquez de choisir vos notes au hasard, et qu'elles sonnent faux. Heureusement pour nous, il existe une façon d'écrire où **aucune note ne peut sonner faux**. |
| 0:15 → 0:50 | Strudel : `n("0 1 2 3 4 5 6 7").scale("D:minor")`, Play. Puis `gammes-1-marches.png` | Au lieu des notes, je passe des **numéros** en paramètre de la fonction `n()`. Et `.scale()` les transforme en notes de la **gamme** de ré mineur : la tonalité de notre morceau. *(laisser entendre)* Les numéros sont des marches : zéro, c'est ré ; sept, c'est encore ré, mais une octave plus haut. Le 5, lui, c'est un si bémol : une note pas simple à écrire, mais ici, il suffit de taper 5. |
| 0:50 → 1:05 | Strudel : `"D:minor"` → `"D4:minor"`, `Ctrl + Entrée` | Sans chiffre, la gamme joue dans l'octave par défaut, la 3. Pour monter d'une octave, je passe à `.scale()` la note de départ avec son octave : `D4`. *(laisser entendre)* |
| 1:05 → 1:25 | Remplacer par le code 1, `Ctrl + Entrée` | Notre *pluck* : ré, mi, fa, la. Comme sur le piano roll de la 1.5, imaginez-les en escalier : ce sont les marches 0, 1, 2 et 4. Mêmes notes, même son : seule l'écriture a changé. *(laisser entendre)* |
| 1:25 → 1:50 | Changer `4` en `3`, réévaluer, puis en `6`, réévaluer, puis revenir à `4` | Maintenant, j'improvise. Je remplace le 4 par un 3, un sol… *(laisser entendre)* puis par un 6, un do… *(laisser entendre)* Tout reste dans la gamme : rien ne détonne. |
| 1:50 → 2:05 | `gammes-2-trois-gammes.png` | Sur un piano, entre un ré et le ré suivant, il y a douze touches, blanches et noires. Une gamme n'en garde que **sept**. C'est exactement comme un **tableau** de sept valeurs : le chiffre qu'on passe à `n()`, c'est l'**index**. Si on passe une autre gamme à `.scale()`, on change de tableau : même ré de départ, mais d'autres touches. |
| 2:05 → 2:35 | Strudel : code 2, `Ctrl + Entrée`. Zoom sur le nom de gamme qui s'encadre | Avec les mêmes numéros, voici trois gammes différentes, une par cycle. En **majeur**, c'est plus lumineux. En **mineur**, plus sombre. Et pourtant, seules trois notes changent. *(laisser entendre)* Enfin, la **pentatonique** ne garde que cinq notes, celles qui vont toutes bien ensemble, même jouées en même temps : idéale pour débuter. *(laisser entendre)* |
| 2:35 → 3:00 | Strudel : code 3, `Ctrl + Entrée`. Laisser jouer **au moins 2 tours** | Le *pluck* du morceau dure deux cycles. La première moitié, entre crochets, ne change jamais. La seconde, entre chevrons, alterne : d'abord les mêmes quatre notes, puis une variante qui monte sur le 5, le si bémol. *(laisser entendre)* On dirait une question, puis sa réponse. |
| 3:00 → 3:15 | Bloc « Votre mélodie en numéros » de la page 3.4 | À vous : improvisez en ne changeant que les numéros, puis gardez le *pluck* du morceau. |

Code 1 :

```js
n("0 ~ 1 ~ 2 ~ 4 ~")
  .scale("D4:minor")
  .s("sawtooth")
```

Code 2 :

```js
n("0 1 2 3 4 5 6 7")
  .scale("<D4:major D4:minor D4:minor:pentatonic>")
```

Code 3, l'état final :

```js
n("[0 ~ 1 ~ 2 ~ 4 ~] <[0 ~ 1 ~ 2 ~ 4 ~] [0 ~ 5 ~ 0 ~ 4 ~]>")
  .scale("D4:minor")
  .s("sawtooth")
```

`gammes-1-marches.png` : un escalier de huit marches, de 0 à 7, avec sous
chaque marche sa note (ré, mi, fa, sol, la, si bémol, do, ré). Le 0 et le 7
ont la même couleur : c'est la même note.

`gammes-2-trois-gammes.png` : trois rangées de clavier d'une octave, de ré à
ré, une par gamme. Les touches choisies sont allumées. En majeur, les trois
notes qui changent (fa dièse, si, do dièse) sont en `pulse`, l'orange des
différences. La pentatonique n'a que cinq touches allumées. Mêmes notes que le
tableau de la page.

## Vidéo 3.5 — Ajouter un pad (2 min 50)

Le *pad* remplit le vide de la batterie avec des sons longs. La vidéo montre
aussi, en direct, **le piège du `.bank()`** : posé sur le grand `stack()`, il
rend le *pad* muet, sans erreur. Images dans
`FYC/S3-harmonie-de-base/3.5-ajouter-un-pad/3-images/`.

Pour la démo : préparer le code 3, avec son `.bank()` mal placé, dans le
presse-papiers, puis le coller. Le taper en direct serait trop long.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:20 | `pad-0-titre.png`, puis Strudel : la batterie de la 3.1 qui tourne (code 1) | Notre batterie est faite de sons **courts** : ils frappent et s'éteignent, et laissent du vide entre chaque son. On va le remplir avec un ***pad*** : une nappe de sons **longs**, qui tient tout le cycle. |
| 0:20 → 0:50 | Stop. Strudel : `n("0,2,4").scale("D4:minor").s("sine")`, Play. Puis `pad-1-accord.png` | En séquence 2, on a vu que la virgule permettait de superposer des pistes. On peut faire de même avec les **notes** : elles sont jouées ensemble. *(laisser entendre)* Zéro, deux, quatre : une marche sur deux dans la gamme. Ré, fa, la, jouées en même temps : on vient de faire notre premier **accord**. |
| 0:50 → 1:15 | Remplacer par `n("<[0,2,4] [0,2,5]>")`, puis ajouter `.gain(0.3)`, `Ctrl + Entrée` | Avec les chevrons, deux accords peuvent alterner, un par cycle. Chaque accord se regroupe alors entre **crochets** : sans eux, les virgules découperaient tout le motif. Le second accord ne change qu'une note : la plus haute monte d'une marche. *(laisser entendre)* Avec un synthé rond, `sine`, et un volume réduit avec `gain` : le *pad* doit se sentir plus que s'entendre. |
| 1:15 → 1:45 | Remplacer par le code 2, `Ctrl + Entrée`. Laisser jouer **au moins 2 cycles** | Dans notre morceau, le *pad* fait un peu plus. Au premier cycle, il tient son accord. Au second, il joue d'abord les quatre notes du *pluck*, puis tient le second accord. *(laisser entendre)* |
| 1:45 → 2:15 | Coller le code 3, Play : la batterie joue, le *pad* se tait. Puis `pad-2-bank.png` | Je mets mon *pad* dans le même `stack()` que la batterie… et il se tait. Rappelez-vous : la méthode `.bank()` **préfixe** le nom de chaque son par celui de la machine. `sine` est devenu `RolandTR808_sine`, un son qui n'existe pas. Et Strudel ne dit rien. |
| 2:15 → 2:35 | Strudel : passer au code 4 (la batterie dans son propre `stack()`, avec son `.bank()`), `Ctrl + Entrée` | Pour résoudre ça, on **imbrique** : `stack()` renvoie un motif, et ce motif peut être passé en paramètre d'un autre `stack()`. La batterie garde **son propre** `stack()`, avec sa machine. Le *pad* vit à côté, dans le grand `stack()` du morceau. *(laisser entendre)* |
| 2:35 → 2:50 | Bloc « Votre pad » de la page 3.5 | À vous : comparez `sine` et `sawtooth`, réglez le volume du *pad*, puis posez-le sous votre batterie. |

Code 1, la batterie de la 3.1 :

```js
setcpm(128 / 4)

stack(
  s("bd*4"),
  s("~ cp ~ cp"),
  s("~ hh ~ hh ~ hh ~ hh")
).bank("RolandTR808")
```

Code 2, le *pad* du morceau :

```js
n("<[0,2,4] [[0 ~ 1 ~ 2 ~ 4 ~] [0,2,5]]>")
  .scale("D4:minor")
  .s("sine")
  .gain(0.16)
```

Code 3, **le piège**, à coller (le *pad* se tait) :

```js
setcpm(128 / 4)

stack(
  s("bd*4"),
  s("~ cp ~ cp"),
  s("~ hh ~ hh ~ hh ~ hh"),
  n("<[0,2,4] [[0 ~ 1 ~ 2 ~ 4 ~] [0,2,5]]>")
    .scale("D4:minor").s("sine").gain(0.16)
).bank("RolandTR808")
```

Code 4, l'état final (celui de la page) :

```js
setcpm(128 / 4)

stack(
  stack(
    s("bd*4"),
    s("~ cp ~ cp"),
    s("~ hh ~ hh ~ hh ~ hh")
  ).bank("RolandTR808"),
  n("<[0,2,4] [[0 ~ 1 ~ 2 ~ 4 ~] [0,2,5]]>")
    .scale("D4:minor").s("sine").gain(0.16)
)
```

Pour passer du code 3 au code 4 en direct : ajouter `stack(` avant `s("bd*4")`,
puis `).bank("RolandTR808"),` après la ligne du *hi-hat*, et retirer le
`.bank()` de la dernière ligne.

`pad-1-accord.png` : l'escalier de la 3.4 (marches 0 à 7), avec les marches
0, 2 et 4 allumées et empilées à droite en un seul bloc : « ré + fa + la =
un accord ».

`pad-2-bank.png` : trois étiquettes `bd`, `cp`, `hh` qui deviennent
`RolandTR808_bd`… (en vert), et `sine` qui devient `RolandTR808_sine`, barré
en `pulse`, avec « introuvable : silence ».

## Vidéo 3.6 — Assembler les trois couches (3 min)

**Une seule idée :** mixer, c'est régler **une couche à la fois**, en partant
de la batterie. On part du morceau complet sans aucun `.gain()`, et on arrive
aux volumes de l'équipe. Commenter et décommenter se fait avec **Ctrl + /**
(vu en 3.1) : c'est plus rapide, et ça se voit à l'écran. Images dans
`FYC/S3-harmonie-de-base/3.6-assembler-les-couches/3-images/`.

**Avant d'enregistrer :** baisser le volume de l'ordinateur. Sans `.gain()`,
le début est fort, et c'est voulu.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:25 | `morceau-0-titre.png`, puis Strudel : coller le code 1 (aucun `.gain()`), Play | Batterie, *pluck*, *pad* : on a les trois couches. Je les joue ensemble, sans réglage. *(laisser entendre)* Tout est là, mais tout se marche dessus : le *pluck* disparaît sous le reste. |
| 0:25 → 0:45 | `morceau-1-roles.png` | Additionner des couches, c'est aussi additionner leurs volumes. **Mixer**, c'est donner à chaque couche le bon volume. La batterie porte le rythme, le *pluck* doit ressortir, et le *pad* rester en fond. |
| 0:45 → 1:05 | Strudel : commenter le *pad* et le *pluck* (Ctrl + /), `Ctrl + Entrée` | Règle numéro un : on ne règle jamais tout en même temps. D'abord la batterie, seule. *(laisser entendre)* C'est la référence : une fois la *bass drum* bien réglée, on n'y touche plus. |
| 1:05 → 1:35 | Décommenter les deux lignes du *pad*. Ajouter `.gain(0.5)`, réévaluer, puis `.gain(0.16)` | On ajoute le *pad*. Le `gain` va de 0, muet, à 1, le volume normal. À 0.5, il couvre encore le *clap*. *(laisser entendre)* À 0.16, il remplit sans rien couvrir. Normal qu'il faille descendre si bas : un accord, c'est trois notes à la fois, et leurs volumes s'additionnent. *(laisser entendre)* |
| 1:35 → 2:00 | Décommenter les deux lignes du *pluck*, ajouter `.gain(0.12)`, `Ctrl + Entrée` | Puis le *pluck*. `sawtooth` est très présent par nature : 0.12 suffit. *(laisser entendre)* Mais il se bat encore avec le *clap* et le *hi-hat*, qui frappent dans le médium et l'aigu, là où joue le *pluck*. |
| 2:00 → 2:25 | Ajouter `.gain(0.3)` au *clap* et `.gain(0.32)` au *hi-hat*, `Ctrl + Entrée` | Plutôt que de pousser le *pluck*, je baisse ceux qui le couvrent. Au-dessus de 1, le son peut saturer : on baisse les autres plutôt que de pousser celui-ci. *(laisser entendre)* |
| 2:25 → 2:45 | Baisser franchement le volume de l'ordinateur, laisser jouer | Dernier test : à faible volume. Un déséquilibre s'y entend plus facilement. Si chaque couche s'entend encore, le mix est bon. |
| 2:45 → 3:00 | Bloc « Votre morceau » de la page 3.6 | À vous : assemblez le morceau avec vos lignes, mixez-le couche par couche, puis enregistrez-le. En séquence 4, on va le sculpter. |

Code 1, le morceau sans volumes, à coller :

```js
setcpm(128 / 4)

stack(
  // batterie
  stack(
    s("bd*4"),
    s("~ cp ~ cp"),
    s("~ hh ~ hh ~ hh ~ hh")
  ).bank("RolandTR808"),
  // pad
  n("<[0,2,4] [[0 ~ 1 ~ 2 ~ 4 ~] [0,2,5]]>")
    .scale("D4:minor").s("sine"),
  // pluck
  n("[0 ~ 1 ~ 2 ~ 4 ~] <[0 ~ 1 ~ 2 ~ 4 ~] [0 ~ 5 ~ 0 ~ 4 ~]>")
    .scale("D4:minor").s("sawtooth")
)
```

Code 2, l'état final : le corrigé de la page 3.6, avec `cp` à `0.3`, `hh` à
`0.32`, le *pad* à `0.16` et le *pluck* à `0.12`.

`morceau-1-roles.png` : trois bandes empilées, une par couche, chacune avec
son rôle et une jauge de volume. Batterie (`mint`) : « le rythme, la
référence ». *Pluck* (`lemon`) : « au-dessus ». *Pad* (`lilac`) : « en
fond ».

---

**Vérifications avant chaque export**

- chaque ligne de code tapée à l'écran joue bien ce que la voix annonce ;
- 3.5 : avec le code 3, le *pad* se tait vraiment, et seul « sound
  RolandTR808_sine not found » apparaît en console ;
- 3.6 : aucun `.gain()` au-dessus de 1, et le son du début ne sature pas
  l'enregistrement ;
- sous-titres incrustés et relus : `note`, `sine`, `sawtooth`, `scale`,
  `gain`, *pluck* et *pad* sont souvent mal transcrits ;
- le crédit Omegatron est à l'écran pendant toute la durée de
  `synthes-1-ondes.png` (3.3).

Tout le code ci-dessus est celui des pages S3, déjà évalué dans le REPL du
site, plus deux variantes (le code 3 de la 3.5, le code 1 de la 3.6) vérifiées
le 2026-11-11.
