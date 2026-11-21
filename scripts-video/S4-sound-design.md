# Vidéos S4 — Sound design

Six vidéos courtes, une par sous-séance. Capture d'écran et voix off, sans
visage. Premier jet à réécrire dans votre voix : gardez le contenu et le code,
changez les mots.

**Pour toutes les vidéos**

- l'éditeur vide de strudel.cc : `https://strudel.cc/#IA%3D%3D` ;
- zoom du navigateur à 150 % au moins, **5 à 6 lignes de code visibles au
  maximum**. Exception : le morceau complet de la 4.6. Baissez le zoom juste
  assez pour que tous les blocs tiennent à l'écran ;
- **les curseurs se bougent en silence.** La voix annonce le geste, puis la
  musique joue seule pendant qu'on déplace le curseur : jamais de voix quand
  la musique tourne. Un *(laisser entendre)* marque chaque passage muet ;
- **un seul curseur à la fois**, lentement, en laissant passer quelques notes :
  un réglage d'enveloppe ne s'entend qu'à la note suivante ;
- **aucune dent de scie au-dessus de `.gain(0.12)`** : c'est le volume de tous
  les blocs de la S4. Baissez aussi le volume de l'ordinateur avant la 4.4
  (résonance) ;
- chaque vidéo se termine sur l'exercice de la page, pas sur un résumé ;
- la voix dit les **noms anglais** des sons : *bass drum*, *clap*, *hi-hat*,
  *open hi-hat*, *rim shot*, jamais le code (« hh ») ni le français. Même
  règle pour *pluck*, *pad* et *sub* (expliqué à sa première mention, 4.2) ;
- la voix dit les noms de réglages tels qu'ils s'écrivent : « attack »,
  « decay », « sustain », « release », « lpf », « room »… Les abréviations
  sont développées une fois, à leur première mention.

**Le morceau de la séquence.** La S4 a son propre morceau : les mêmes couches
que celui de la S3, avec d'autres notes, écrites **en lettres**. La voix le
présente comme « le morceau de la séquence », jamais comme « le morceau de
l'équipe ». On en entend une couche par vidéo ; la 4.6 les réunit. Le code
final est celui de la page 4.6.

**Images.** Même style que la S3 : fond `night`, titre jaune en Archivo. Deux
schémas existent déjà dans les pages et se capturent tels quels : l'enveloppe
ADSR (4.1, 4.2) et les zones de fréquences (4.3). Les images seront rangées
dans `FYC/S4-sound-design/<sous-séance>/3-images/` et générées une fois ces
scripts validés.

---

## Vidéo 4.1 — Attack et decay (4 min)

**Deux idées :** l'enveloppe est la **forme** du son dans le temps, et on la
règle **en écoutant pendant que ça joue**, avec un curseur. On commence sur une
note longue, où tout s'entend, puis on revient au *pluck*, où les notes sont
trop courtes pour tout entendre. Images dans
`FYC/S4-sound-design/4.1-enveloppe-attack-decay/3-images/`.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:25 | `attack-0-titre.png`, puis Strudel : coller le code 1 (le *pluck* sans enveloppe), Play | Voici le *pluck* du morceau de cette séquence. Les notes sont justes, mais chacune démarre et s'arrête d'un coup. *(laisser entendre)* Dans cette séquence, on ne touche plus aux notes : on travaille la **forme** de chaque son. |
| 0:25 → 0:50 | Capture du schéma ADSR de la page 4.1 | Cette forme s'appelle l'**enveloppe**. Les synthés la découpent en quatre étapes : *attack*, *decay*, *sustain* et *release*, A-D-S-R. Commençons par les deux premières : la montée du son, puis sa redescente. |
| 0:50 → 1:25 | Strudel : coller le code 2 (note longue, sans curseur), Play. Puis taper `slider(` autour de `0.005`, et `, 0.005, 1)` après, `Ctrl + Entrée` | Pour bien comprendre l'*attack*, prenons une seule note. Je règle sa montée avec **`attack`**, en secondes. À 0.005, c'est instantané. *(laisser entendre)* Pour comparer en direct, j'écris `slider` : un curseur dans le code. Trois nombres : la valeur de départ, le minimum, le maximum. Le curseur apparaît. |
| 1:25 → 1:50 | Monter lentement le curseur : 0.05, 0.2, 0.5, 1. Zoom sur le nombre qui change dans le code | *(laisser entendre)* |
| 1:50 → 2:05 | Le curseur à 1, la note gonfle | Regardez le code : le nombre a suivi le curseur. Plus il est grand, plus la note gonfle lentement. Un son qui claque est **percussif** ; un son qui monte doucement est **progressif**. |
| 2:05 → 2:40 | Coller le code 3 (le *decay* sur la note longue), Play. Monter le curseur de 0.1 à 1.8 | Passons au **`decay`** : le temps que met la note pour redescendre. Le *sustain* est à 0, donc elle redescend jusqu'au silence. À 0.1, c'est un « toc ». *(laisser entendre en montant le curseur)* |
| 2:40 → 2:55 | Le curseur vers 1.5 | Plus le *decay* est long, plus la note résonne, comme une cloche. |
| 2:55 → 3:30 | Coller le code 4 (le *pluck* avec ses deux curseurs), Play. Monter `attack` vers 0.3, puis le redescendre | Retour au *pluck*. Ses notes ne durent que 0,12 seconde. Si je monte l'attaque au-delà… *(laisser entendre)* les notes disparaissent : elles s'arrêtent avant d'avoir fini de monter. Une enveloppe se règle toujours **par rapport à la durée de la note**. |
| 3:30 → 3:45 | Remettre les curseurs à 0.005 et 0.282 | Pour le morceau, nous gardons une attaque instantanée et un *decay* de 0.282 : le *pluck* claque, et garde un peu de corps. *(laisser entendre)* |
| 3:45 → 4:00 | Bloc « Votre son percussif » de la page 4.1 | À vous : sur la note longue, transformez un son percussif en son doux, en ne touchant qu'à l'attaque. Puis essayez la même valeur sur le *pluck*. |

Code 1, le *pluck* sans enveloppe :

```js
setcpm(128 / 4)

note("g#4 ~ ~ c5 ~ ~ a4 ~").fast(2)
  .s("sawtooth")
  .gain(0.12)
```

Code 2, la note longue, à transformer en curseur à l'écran :

```js
setcpm(128 / 4)

note("d4")
  .s("triangle")
  .attack(0.005)
  .sustain(1)
  .gain(0.12)
```

Après le geste : `.attack(slider(0.005, 0.005, 1))`, comme dans la page.

Code 3, le *decay* (bloc « Une note longue : le decay » de la page) :

```js
setcpm(128 / 4)

note("d4")
  .s("triangle")
  .attack(0.005)
  .decay(slider(0.1, 0.1, 1.8))
  .sustain(0)
  .gain(0.12)
```

Code 4, le *pluck* et ses deux curseurs (bloc « Deux curseurs sur le
pluck ») :

```js
setcpm(128 / 4)

note("g#4 ~ ~ c5 ~ ~ a4 ~").fast(2)
  .s("sawtooth")
  .attack(slider(0.005, 0.005, 0.5))
  .decay(slider(0.282, 0.1, 1.2))
  .sustain(0)
  .gain(0.12)
```

**Ne jamais tirer le curseur d'attaque vers 0** : le minimum est 0.005, sinon
chaque note démarre par un clic sec.

La vidéo n'explique pas `.fast(2)` : la page le fait, juste au-dessus du
dernier bloc.

## Vidéo 4.2 — Sustain et release (4 min)

**Une idée :** les deux dernières étapes de l'enveloppe font la différence
entre un **coup bref** et une **nappe**. On reprend la note longue de la 4.1,
puis le *pad*, puis le *sub*, et on finit sur la *bass drum*. Images dans
`FYC/S4-sound-design/4.2-enveloppe-sustain-release/3-images/`.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:20 | `release-0-titre.png`, puis la capture du schéma ADSR, la fin de l'enveloppe en surbrillance | En 4.1, on a réglé la montée et la redescente du son. Il reste ce qui se passe **pendant** la note, et **après** elle. |
| 0:20 → 0:55 | Strudel : coller le code 1 (une note, puis un silence), Play. Monter le curseur de `sustain` de 0 à 1 | Une note, puis un silence. **`sustain`** n'est pas un temps, c'est un **niveau**, de 0 à 1 : le volume tenu jusqu'à la fin de la note. À 0, la note retombe aussitôt. *(laisser entendre en montant le curseur)* |
| 0:55 → 1:30 | `sustain` à 0.7. Monter le curseur de `release` de 0.05 à 1 | Pour finir, **`release`** : le temps que met le son à s'éteindre **après** la fin de la note. *(laisser entendre)* La note déborde dans le silence, et s'y fond. |
| 1:30 → 2:10 | Coller le code 2 (le *pad*), Play | Même chose sur le *pad* du morceau : trois accords. Le `@` donne leur durée relative, et `.slow(2)` étale le tout sur deux cycles, soit huit temps : 4 temps, 3 temps, 1 temps. *(laisser entendre)* Avec un *sustain* haut et un *release* long, c'est une **nappe**. |
| 2:10 → 2:30 | Descendre `sustain` à 0 et `release` vers 0.1 | Et avec un *sustain* à 0 et un *release* court ? *(laisser entendre)* Le même *pad* devient percussif : les accords n'ont pas changé, seulement leur forme. |
| 2:30 → 3:00 | Coller le code 3 (le *sub*), Play | Le morceau a une couche de plus : une basse très grave, le ***sub***, mêmes notes que le *pluck*, trois octaves plus bas. Ses quatre réglages se lisent d'un coup : il claque, retombe vite à un niveau faible, et s'éteint avant la note suivante. *(laisser entendre)* Au casque, c'est mieux : un son aussi grave s'entend mal sur une mauvaise sortie audio. |
| 3:00 → 3:40 | Coller le code 4 (la *bass drum* longue), Play. Descendre le curseur de `decay` de 1.2 vers 0.15 | Dernier cas : un son enregistré. L'enveloppe ne peut que le **raccourcir**. La *bass drum* du morceau est déjà très courte, alors on prend sa version longue : `bd:1`, l'enregistrement numéro 1. À 128 BPM, chaque coup déborde sur le suivant. *(laisser entendre en descendant le curseur)* Vers 0.15, elle claque. |
| 3:40 → 4:00 | Bloc « Votre pad » de la page 4.2 | À vous : faites tenir le *pad* d'un accord à l'autre, puis raccourcissez la *bass drum* jusqu'à ce qu'elle claque, sans perdre son grave. |

Code 1, une note puis un silence (variante pour la vidéo, plus claire que la
note longue : le *release* s'entend dans le silence) :

```js
setcpm(128 / 4)

note("d4 ~")
  .s("triangle")
  .attack(0.005).decay(0.3)
  .sustain(slider(0, 0, 1))
  .release(slider(0.05, 0.05, 1))
  .gain(0.12)
```

Code 2, le *pad* (bloc « Le pad, de percussion à nappe ») :

```js
setcpm(128 / 4)

note("[g#3,c4,d#4]@4 [c4,e4,g4]@3 [a3,c4,e4]@1").slow(2)
  .s("sine")
  .attack(0.35).decay(0.4)
  .sustain(slider(0.7, 0, 1))
  .release(slider(0.8, 0, 3))
  .gain(0.3)
```

Code 3, le *sub* (bloc « Le sub ») :

```js
setcpm(128 / 4)

note("g#1 ~ ~ c2 ~ ~ a1 ~").fast(2)
  .s("sine")
  .attack(0.005).decay(0.35)
  .sustain(0.2).release(0.1)
  .gain(0.5)
```

Code 4, la *bass drum* longue (bloc « Votre grosse caisse ») :

```js
setcpm(128 / 4)

s("bd:1*4").bank("RolandTR808")
  .decay(slider(1.2, 0.05, 1.2))
```

## Vidéo 4.3 — Filtres passe-bas et passe-haut (3 min)

**Une idée :** un filtre retire une partie des fréquences, et il ne peut
retirer que ce qui existe. On le montre en **balayant** la coupure pendant
la lecture. Images dans `FYC/S4-sound-design/4.3-filtres/3-images/`.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:30 | `filtres-0-titre.png`, puis la capture du schéma « Où joue chaque couche du morceau » | Chaque couche du morceau occupe une zone de fréquences : la *bass drum* et le *sub* dans le grave, le *hi-hat* tout en haut, le *pluck* et le *pad* au milieu. Quand deux couches se recouvrent, elles se masquent. Filtrer, c'est **nettoyer** : retirer à chaque couche ce qui n'est pas son rôle. |
| 0:30 → 0:50 | `filtres-1-passe.png` | Deux filtres. Le **passe-bas**, `lpf`, pour *low-pass filter* : il laisse passer les graves et coupe les aigus. Le **passe-haut**, `hpf`, fait l'inverse. Le nombre, c'est la **fréquence de coupure**, en hertz. |
| 0:50 → 1:20 | Strudel : coller le code 1 (le *pad* en `sine`), Play. Descendre le curseur de 8000 à 1000 | Premier essai sur le *pad*, en `sine`. Je descends la coupure… *(laisser entendre)* Rien ne change. Une sinusoïde n'a qu'une seule fréquence : il n'y a rien au-dessus à retirer. |
| 1:20 → 1:55 | Remplacer `sine` par `sawtooth`, `Ctrl + Entrée`. Monter le curseur à 8000, puis le redescendre lentement jusqu'à 150 | On passe le *pad* en *sawtooth*, le synthé le plus riche en aigus. *(laisser entendre en descendant le curseur)* Vers 1000, une nappe chaude. Vers 150, un son sourd et lointain. On part d'un son riche et on en retire une partie : c'est la synthèse soustractive. |
| 1:55 → 2:25 | Coller le code 2 (passe-haut sur le *pluck*), Play. Monter le curseur de 100 à 3000 | Utilisons notre *pluck* pour découvrir le passe-haut : je monte la coupure. *(laisser entendre)* Le *pluck* s'amincit, jusqu'à sonner comme à travers un téléphone. |
| 2:25 → 2:45 | Coller le code 3 (les *hi-hats*), Play. Monter le curseur jusqu'à 10 000 | Dans le morceau, le passe-haut va sur le *hi-hat*. Celui de la 808 est déjà très aigu : on n'entend la différence qu'en haut de la course. *(laisser entendre)* |
| 2:45 → 3:00 | Bloc « Votre pad » de la page 4.3 | À vous : un passe-bas sur le *pad*, un passe-haut sur le *hi-hat*, et comparez : sur lequel le filtre s'entend-il le plus ? |

Code 1, le *pad* en `sine` avec un passe-bas (variante pour la vidéo : il
démontre qu'un filtre ne fait rien sur une sinusoïde) :

```js
setcpm(128 / 4)

note("[g#3,c4,d#4]@4 [c4,e4,g4]@3 [a3,c4,e4]@1").slow(2)
  .s("sine")
  .attack(0.35).decay(0.4).sustain(0.7).release(0.8)
  .lpf(slider(8000, 150, 8000))
  .gain(0.12)
```

Code 2, le passe-haut sur le *pluck* (bloc « Un passe-haut sur le pluck ») :

```js
setcpm(128 / 4)

note("g#4 ~ ~ c5 ~ ~ a4 ~").fast(2)
  .s("sawtooth")
  .attack(0.005).decay(0.282).sustain(0).release(0.12)
  .hpf(slider(100, 100, 3000))
  .gain(0.12)
```

Code 3, les *hi-hats* (bloc « Vos charlestons ») :

```js
setcpm(128 / 4)

s("~ hh ~ hh ~ hh ~ hh").bank("RolandTR808")
  .hpf(slider(100, 100, 10000))
  .gain(0.33)
```

`filtres-1-passe.png` : deux courbes côte à côte, le passe-bas qui descend
après la coupure, le passe-haut qui monte avant. Sous chaque courbe, la
fonction (`lpf`, `hpf`) et « laisse passer les graves » / « laisse passer les
aigus ».

## Vidéo 4.4 — La résonance (2 min)

**Une idée :** la résonance fait « chanter » le filtre autour de sa coupure.
On la pousse jusqu'au sifflement, puis on revient à un réglage musical.
Images dans `FYC/S4-sound-design/4.4-resonance/3-images/`.

**Avant d'enregistrer :** baisser le volume de l'ordinateur. La résonance
ajoute du volume, et le sifflement peut surprendre.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:25 | `resonance-0-titre.png`, puis Strudel : coller le code 1, Play | Reprenons le *pad* filtré de la 4.3. Le filtre est neutre : il retire des aigus, sans rien ajouter. La **résonance** va lui donner une voix. *(laisser entendre)* |
| 0:25 → 0:45 | Zoom sur `.lpq` | Elle se règle avec `lpq` : *lp* pour *low-pass*, comme dans `lpf`, et *q* pour le **facteur Q**, le nom technique de la résonance. |
| 0:45 → 1:10 | Monter lentement le curseur de `lpq` de 0 à 12 | Je la monte, par petits pas. *(laisser entendre)* Une fréquence ressort, le son devient nasal, puis il siffle. |
| 1:10 → 1:35 | Coller le code 2 (coupure et résonance en curseurs), Play. Résonance à 8, balayer la coupure de 1000 à 4000 et retour | Avec une résonance haute, déplacer la coupure fait entendre la coupure elle-même, comme une voyelle qui change. *(laisser entendre)* C'est le son « acide » de beaucoup de morceaux de techno. |
| 1:35 → 1:50 | Coupure à 1000, résonance redescendue vers 4 | Pour une couche de fond, on revient à un réglage discret : entre 2 et 6, la résonance colore le *pad* sans attirer l'attention. *(laisser entendre)* |
| 1:50 → 2:00 | Bloc « Votre pad résonant » de la page 4.4 | À vous : poussez la résonance jusqu'à percevoir un son marqué, puis revenez à un réglage agréable. |

Code 1 (bloc « La résonance du pad ») :

```js
setcpm(128 / 4)

note("[g#3,c4,d#4]@4 [c4,e4,g4]@3 [a3,c4,e4]@1").slow(2)
  .s("sawtooth")
  .attack(0.35).decay(0.4).sustain(0.7).release(0.8)
  .lpf(1000)
  .lpq(slider(0, 0, 12))
  .gain(0.12)
```

Code 2 (bloc « Balayer un filtre résonant ») :

```js
setcpm(128 / 4)

note("[g#3,c4,d#4]@4 [c4,e4,g4]@3 [a3,c4,e4]@1").slow(2)
  .s("sawtooth")
  .attack(0.35).decay(0.4).sustain(0.7).release(0.8)
  .lpf(slider(1000, 150, 8000))
  .lpq(slider(8, 0, 12))
  .gain(0.12)
```

Le « Le saviez-vous ? » du pendule reste dans la page : la vidéo n'a pas le
temps de le raconter.

## Vidéo 4.5 — Reverb et delay (3 min)

**Une idée :** deux effets d'espace, deux sensations. La **reverb** place le
son dans une salle, le **delay** le répète. On les dose en les coupant puis en
les remettant. Images dans `FYC/S4-sound-design/4.5-reverb-et-delay/3-images/`.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:25 | `espace-0-titre.png`, puis `espace-1-reverb-delay.png` | Jusqu'ici, tous les sons sont collés contre l'oreille. Deux effets leur donnent de l'espace. La **reverb** imite une salle : un halo continu derrière le son. Le **delay** imite un mur lointain : des échos distincts, de plus en plus faibles. |
| 0:25 → 1:00 | Strudel : coller le code 1 (le *pad*), Play. Monter `room` de 0 à 0.8, puis redescendre vers 0.35 | La reverb se règle avec `room`, de 0 à 1. *(laisser entendre en montant le curseur)* Trop haut, le *pad* devient flou. Vers 0.35, il prend juste du recul. |
| 1:00 → 1:30 | Coller le code 2 (le *pluck*), Play. Zoom sur `.delaytime(60 / 128 / 2)` | Le delay, sur le *pluck*. `delaytime`, c'est le temps entre deux échos, en secondes. On le cale sur le tempo : 60 divisé par 128, ce qui nous donne la durée d'un temps à 128 BPM ; divisé par 2, un demi-temps. L'écho tombe **en rythme**. |
| 1:30 → 1:55 | Monter le curseur de `delay` de 0 à 0.8, puis redescendre vers 0.25 | *(laisser entendre)* Trop d'écho brouille la mélodie. Vers 0.25, il remplit les silences du *pluck*. |
| 1:55 → 2:15 | `espace-2-feedback.png` | Un réglage à ne jamais pousser : `delayfeedback`. Il renvoie une part de chaque écho dans le suivant. À 1 ou plus, rien ne s'éteint, et le son s'accumule sans fin. Pour notre morceau on reste vers 0.25. |
| 2:15 → 2:45 | Coller le code 3 (le *pluck* et le *pad* ensemble), Play. Zoom sur `.orbit(3)` et `.orbit(4)` | Dernier détail : dans Strudel, la reverb et le delay appartiennent à une **orbite**, un circuit d'effets. Si deux couches partagent la même, elles se disputent l'effet. Alors chaque couche reçoit la sienne : le *pluck* sur la 3, le *pad* sur la 4. *(laisser entendre)* |
| 2:45 → 3:00 | Bloc « Votre pluck et votre pad » de la page 4.5 | À vous : de la reverb sur le *pad*, un delay sur le *pluck*. Puis coupez chaque effet et remettez-le : le morceau doit paraître vide sans eux, et pas brouillé avec eux. |

Code 1 (bloc « De la reverb sur le pad ») :

```js
setcpm(128 / 4)

note("[g#3,c4,d#4]@4 [c4,e4,g4]@3 [a3,c4,e4]@1").slow(2)
  .s("sawtooth")
  .attack(0.35).decay(0.4).sustain(0.7).release(0.8)
  .lpf(1000).lpq(4)
  .room(slider(0, 0, 0.8))
  .gain(0.12)
```

Code 2 (bloc « Un écho sous le pluck ») :

```js
setcpm(128 / 4)

note("g#4 ~ ~ c5 ~ ~ a4 ~").fast(2)
  .s("sawtooth")
  .attack(0.005).decay(0.282).sustain(0).release(0.12)
  .delay(slider(0, 0, 0.8))
  .delaytime(60 / 128 / 2)
  .delayfeedback(0.25)
  .gain(0.12)
```

Code 3 : le bloc « Votre pluck et votre pad » de la page, tel quel.

**Ne jamais montrer `delayfeedback(1)` à l'écran, même pour démontrer** : le
son monte sans fin, et l'enregistrement sature.

`espace-1-reverb-delay.png` : à gauche, un son suivi d'un halo qui s'estompe
en continu (« reverb : une salle ») ; à droite, le même son suivi de trois
copies séparées, de plus en plus petites (« delay : un écho »).

`espace-2-feedback.png` : trois rangées d'échos. `0.25` : ils s'éteignent
vite. `0.75` : ils durent. `1` : ils ne baissent plus, barré en `pulse`.

## Vidéo 4.6 — Sculpter sa musique (3 min)

**Deux idées :** écrire le morceau en **blocs nommés**, une couche par bloc,
et sculpter **couche par couche**. On part du morceau brut et on arrive au
morceau sculpté. Pour tenir en 3 minutes, les réglages de chaque couche se
collent au lieu d'être tapés. Images dans
`FYC/S4-sound-design/4.6-sculpter-sa-musique/3-images/`.

**Avant d'enregistrer :** préparer dans un fichier texte les lignes de réglage
de chaque couche (corrigé de la page 4.6), pour les coller une à une.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:25 | `sculpter-0-titre.png`, puis Strudel : coller le code 1 (le morceau brut), Play | On arrive à la fin de cette séquence : il nous reste à assembler toutes les couches du morceau. D'abord sans aucun réglage. *(laisser entendre)* Le *sub* bourdonne, et tout démarre d'un coup. On va le sculpter. |
| 0:25 → 0:55 | Zoom sur `batterie:`, `sub:`, `pluck:`, `pad:` | Le code a changé de forme. Chaque couche est un **bloc**, précédé d'un **nom** et de deux-points. Strudel joue tous les blocs en même temps. Attention, ce n'est pas une variable : c'est un label JavaScript, que Strudel détourne. On ne peut pas réutiliser le nom ailleurs. |
| 0:55 → 1:15 | Ajouter `_` devant `pad:`, `Ctrl + Entrée`. Puis devant `pluck:` et `sub:` | Le grand avantage : couper une couche. Un tiret bas devant son nom, et tout le bloc se tait. *(laisser entendre)* Je ne garde que la batterie. |
| 1:15 → 1:35 | Coller le passe-haut des *hi-hats*. Retirer le `_` de `sub:`, coller l'enveloppe du *sub*, `Ctrl + Entrée` | On sculpte une couche à la fois. Le passe-haut sur le *hi-hat*. Puis le *sub* : son enveloppe, pour qu'il claque sans déborder. *(laisser entendre)* |
| 1:35 → 2:00 | Retirer le `_` de `pluck:`, coller son enveloppe, puis son écho, `Ctrl + Entrée` | Ensuite, l'enveloppe du *pluck*, puis son écho calé sur le tempo. *(laisser entendre)* |
| 2:00 → 2:25 | Retirer le `_` de `pad:`, coller son enveloppe, son filtre, sa résonance et sa reverb, `Ctrl + Entrée` | Et pour finir, l'enveloppe « nappe » du *pad*, le passe-bas, un peu de résonance et de la reverb. *(laisser entendre)* |
| 2:25 → 2:45 | Laisser jouer le morceau sculpté | *(laisser entendre)* |
| 2:45 → 3:00 | Bloc « Votre morceau sculpté » de la page 4.6, puis l'aide-mémoire ouvert sur la page de la séquence 4 | À vous : sculptez le morceau brut, une couche à la fois. Tous les réglages de la séquence vous attendent dans l'aide-mémoire, sur la page de la séquence. |

Code 1, le morceau brut : le bloc « Votre morceau sculpté » de la page 4.6,
tel quel.

Code 2, l'état final : le bloc « Le morceau sculpté » de la page 4.6, **sans
les curseurs** (remplacer chaque `slider(v, min, max)` par sa valeur `v`),
pour que la fin de la vidéo reste lisible.

Le piège des **deux blocs du même nom** reste dans la page : il ne se montre
pas bien en vidéo, puisque rien ne se passe à l'écran.

---

**Vérifications avant chaque export**

- chaque ligne de code tapée à l'écran joue bien ce que la voix annonce ;
- aucune voix pendant qu'un curseur bouge ou que la musique joue seule ;
- aucune dent de scie au-dessus de `.gain(0.12)`, aucun `delayfeedback` à 1,
  et le sifflement de la 4.4 ne sature pas l'enregistrement ;
- les curseurs s'affichent bien sur strudel.cc (ils apparaissent après
  `Ctrl + Entrée`) ;
- sous-titres incrustés et relus : `attack`, `decay`, `sustain`, `release`,
  `lpf`, `hpf`, `lpq`, `room`, `delay`, `orbit`, `slider`, *pluck*, *pad* et
  *sub* sont souvent mal transcrits.

Le code des scripts est celui des pages S4, déjà évalué dans le REPL du site,
plus trois variantes pour la vidéo : le code 1 de la 4.1, le code 1 de la 4.2
et le code 1 de la 4.3.
