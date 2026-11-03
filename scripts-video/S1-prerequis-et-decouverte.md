# Vidéos S1 — Prérequis & Découverte

Quatre vidéos courtes, une par sous-séance (la 1.1 est déjà tournée).
Capture d'écran et voix off, sans visage. Premier jet à réécrire dans votre
voix : gardez le contenu et le code, changez les mots.

**Pour toutes les vidéos**

- l'éditeur vide de strudel.cc : `https://strudel.cc/#IA%3D%3D` ;
- zoom du navigateur à 150 % au moins, **5 à 6 lignes de code visibles au maximum** ;
- notifications coupées, niveau du micro testé pendant que Strudel joue : la
  voix doit rester au-dessus de la musique ;
- chaque vidéo se termine sur l'exercice de la page, pas sur un résumé.

---

## Vidéo 1.2 — Brève histoire du live coding (3 min)

**L'exception du plan** : pas de code, la vidéo raconte la frise en images.
Elle reprend donc en partie le texte de la page.

**Images à trouver avant le montage**, sous licence libre uniquement
(Wikimedia Commons d'abord) : le tambour mémoire de l'ILLIAC I, un synthétiseur modulaire
avec ses câbles, une capture du logiciel de MAO LMMS (CC0), une scène d'algorave avec l'écran
projeté. Chaque image est créditée **à l'écran** pendant son passage, et ajoutée à
`src/content/sources.yaml` (rubrique `illustrations`), comme pour les images du
site.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:15 | Titre « Brève histoire du live coding » | Avant d'écrire notre première ligne, faisont un petit détour par l'histoire pour comprendre d' ou vient le live coding. |
| 0:15 → 0:50 | Photo du tambour mémoire de l'ILLIAC I, puis frise Jitter : **1957** · *Illiac Suite* | Faire de la musique avec un ordinateur, ce n'est pas nouveau. En 1957, Lejaren Hiller et Leonard Isaacson utilisent ILLIAC I pour composer la Suite Illiaque un quatuor à cordes qui est l’une des premières pièces de musique à être écrite via un programme. |
| 0:50 → 1:25 | Photo d'un synthé modulaire et de ses câbles, puis capture de LMMS (MAO) | Ensuite viennent les synthés modulaires, où l'on relie des modules par des câbles, puis la musique assistée par ordinateur, avec ses séquenceurs et ses logiciels de studio. |
| 1:25 → 2:10 | Frise : **2004** · TOPLAP, photo d'une algorave avec l'écran projeté | Au début des années 2000, des artistes font quelque chose de nouveau : ils écrivent le code **pendant** le concert, et ils montrent leur écran au public. C'est ça, le live coding. |
| 2:10 → 2:45 | Frise : TidalCycles → **2022** · Strudel, puis l'éditeur strudel.cc | TidalCycles permet de décrire la musique sous forme de motifs. En 2022, Strudel reprend cette idée en JavaScript, directement dans le navigateur. C'est l'outil de ce cours : rien à installer. |

## Vidéo 1.3 — Le REPL (2 min 15)

On explique d'abord le titre (ce qu'est le REPL, pourquoi Strudel l'utilise),
puis on le montre. Les mots anglais sont introduits avec leur traduction.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:30 | Titre « Le REPL », puis les quatre mots qui apparaissent un à un : **Read · Evaluate · Print · Loop** | Le REPL, c'est l'outil qu'on va utiliser dans tout le cours. Quatre mots anglais : **Read**, lire ; **Evaluate**, évaluer ; **Print**, afficher ; **Loop**, recommencer. On écrit du code, la machine le lit, l'exécute, montre le résultat, et on recommence. |
| 0:30 → 0:50 | strudel.cc, éditeur vide | Pourquoi c'est parfait pour la musique ? Parce que dans Strudel, le résultat ne s'affiche pas : il **se joue**. Et on peut changer le code **pendant que la musique tourne**, sans rien arrêter. C'est ça, le live coding. |
| 0:50 → 1:10 | Taper lentement `s("bd")` | Avant que Strudel puisse lire, il faut écrire. **`s`**, c'est le raccourci de ***sound***, le son. Entre guillemets, le nom du son : **`bd`**, pour ***bass drum***. *Bass drum*, la grosse caisse. |
| 1:10 → 1:30 | Ajouter `*4`. Surimpression : une mesure de 4 cases | L'étoile, c'est le **multiplicateur** : elle répète le son dans un **cycle**. Un cycle, c'est l'unité de temps de Strudel, l'équivalent d'une **mesure**. Ici, une mesure de **quatre temps**. Avec `*4`, on a un coup par temps. Avec `*8`, deux coups par temps. |
| 1:30 → 1:45 | Clic sur **Play**. Laisser tourner deux cycles | *(laisser entendre)* Strudel lit, évalue, et joue. Un, deux, trois, quatre… et le cycle recommence. |
| 1:45 → 1:55 | Remplacer `4` par `8`, **sans réévaluer** | Je passe en 8… et rien ne change. Strudel joue toujours la dernière version qu'il a évaluée. |
| 1:55 → 2:05 | `Ctrl + Entrée`. Laisser tourner | Ctrl + Entrée : je réévalue. *(laisser entendre)* Huit coups, et la musique ne s'est pas arrêtée. |
| 2:05 → 2:15 | Retour aux quatre mots, puis bloc « Votre premier rythme » de la page | C'est la **boucle** du REPL : écrire, évaluer, écouter, recommencer. À vous : le bloc juste en dessous est un vrai éditeur. Changez le chiffre et réévaluez. |

`*8` fait **huit coups dans une mesure de quatre temps**, pas une mesure de
huit temps : ne pas dire « huit temps ».

### Vocabulaire de référence

| Terme | Anglais | Définition |
|---|---|---|
| Morceau | *track*, *song* | Une œuvre musicale entière, du début à la fin. |
| Piste | *track* | Une couche du morceau : batterie, basse, mélodie… Dans Strudel, une ligne par piste (2.4). |
| Mesure | *bar* | Un bloc de temps qui se répète ; le plus souvent 4 temps. |
| Temps | *beat* | La pulsation que l'on compte « 1, 2, 3, 4 ». |
| Tempo | *tempo*, en *BPM* | La vitesse des temps, en battements par minute. |
| Boucle | *loop* | Un passage qui se répète sans fin. |
| Motif | *pattern* | Ce que décrit le code Strudel : quels sons, et quand. |
| Cycle | *cycle* | L'unité de temps de Strudel ; le motif se répète à chaque cycle. Comparable à une mesure. |

## Vidéo 1.4 — Notes anglaises et drum kit (2 min 25)

Même structure que la 1.3 : on explique le titre, puis on montre. Chaque code
est dit avec son nom anglais complet. Images dans `FYC/S1.4/images/`.

**Avant d'enregistrer** : police de l'éditeur Strudel vers 40–48 (onglet
*settings*), sinon le code est illisible dans le lecteur du site (632 px de large).

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:15 | `notes-0-titre.png` | Pour écrire de la musique dans Strudel, il faut parler sa langue. Et sa langue, c'est l'anglais : pour les notes, et pour les sons de batterie. |
| 0:15 → 0:35 | `notes-1-lettres.png` | En anglais, les notes s'écrivent avec des lettres. **C**, c'est do. **D**, ré. **E**, mi… jusqu'à **B**, si. |
| 0:35 → 0:45 | `notes-2-repere-a.png` | Le repère à retenir : **A, c'est la**. Les lettres commencent à la, les syllabes à do : c'est pour ça qu'elles semblent décalées. |
| 0:45 → 1:00 | `notes-3-batterie.png` | Et pour la batterie, le ***drum kit***, Strudel parle aussi anglais. Chaque son a son code de deux ou trois lettres, tiré de son nom. |
| 1:00 → 1:25 | Strudel : taper `s("bd sd hh")`, Play | **`bd`**, ***bass drum***, la grosse caisse : vous la connaissez. **`sd`**, ***snare drum***, la caisse claire. **`hh`**, ***hi-hat***, le charleston. *(laisser entendre)* |
| 1:25 → 1:45 | Remplacer `hh` par `oh`, `Ctrl + Entrée` | **`oh`**, ***open hi-hat***, le charleston ouvert. Même cymbale, mais la pédale est relâchée : le son traîne. |
| 1:45 → 2:00 | Remplacer `sd` par `rim`, `Ctrl + Entrée` | **`rim`**, pour ***rimshot*** : on frappe le cercle de la caisse claire au lieu de la peau. Même fût, autre son. Un code ne désigne donc pas une pièce, mais **un son**. |
| 2:00 → 2:15 | Taper `bdd` à la place de `bd`, `Ctrl + Entrée` | Attention : une faute de frappe, et Strudel ne montre aucune erreur. Il cherche un son qui n'existe pas, et laisse un silence. |
| 2:15 → 2:25 | Page 1.4 : le clavier et la carte de la batterie | Dans la page, chaque note et chaque son ont leur bouton. Écoutez-les tous avant l'exercice. |

Crédit à l'écran sur l'image de batterie (déjà gravé dans l'image) :
« Schéma : Pbroks13, CC BY 3.0, Wikimedia Commons ».

## Vidéo 1.5 — Une gamme complète (2 min 20)

Trois idées seulement, sans solfège : la gamme monte, le chiffre change la
**hauteur**, le dièse est un demi-ton au-dessus. Ne jamais dire « ton » pour
parler de hauteur (le mot désigne un écart, deux demi-tons). Images dans
`FYC/S1.5/images/`. Police de l'éditeur Strudel vers 40–48.

| Temps | Écran | Voix |
|---|---|---|
| 0:00 → 0:15 | `gamme-0-titre.png`, la gamme `note("c d e f g a b c4")` en fond | Une gamme, c'est les sept notes dans l'ordre, de la plus grave à la plus aiguë. En anglais, on dit ***scale***, du latin *scala* : l'escalier. Les notes montent, marche après marche. |
| 0:15 → 0:40 | Strudel : taper `note("c d e f g a b")`, Play | Pour jouer des notes, on n'écrit plus `s`, mais **`note`**. Puis, entre guillemets, les notes à jouer, séparées par des espaces. Pour la démo, j'écris toute la gamme. *(laisser entendre)* Elle monte… et s'arrête juste avant d'arriver. |
| 0:40 → 0:55 | Ajouter `c4`, `Ctrl + Entrée` | Pour la terminer, j'ajoute **`c4`** : un do plus aigu que celui du départ, car sans chiffre, Strudel joue en 3. *(laisser entendre)* Cette fois, la gamme est complète. |
| 0:55 → 1:20 | `gamme-1-hauteurs.png`, puis Strudel : `note("c2 c3 c4 c5 c6 c7")` | Ce chiffre, c'est la **hauteur** : de 1, très grave, à 8, très aigu. Écoutez la même note, à six hauteurs différentes. *(laisser entendre)* |
| 1:20 → 1:45 | `gamme-2-dieses.png`, puis Strudel : `note("c c# d")` | Entre certaines notes, il existe une note intermédiaire : le **dièse**, écrit `#`. Sur un piano, ce sont les touches noires. Regardez : il n'y en a pas entre mi et fa, ni entre si et do. *(laisser entendre)* |
| 1:45 → 2:05 | strudel.cc : `note("c d e f g a b c4").pianoroll()` | Pour la visualiser sur strudel.cc, ajoutons la méthode `.pianoroll()` à la gamme. Chaque note devient un rectangle : plus il est haut, plus la note est aiguë. Et la gamme dessine… un escalier. |
| 2:05 → 2:20 | Les blocs de la page 1.5 | À vous : dans la page, inversez la gamme, puis mélangez les notes. |

Vérifié dans Strudel (`noteToMidi`, et motifs évalués dans le REPL du site) :
`c` = `c3` ; `c2` → `c7` montent de 12 demi-tons à chaque chiffre ; `c#` est
un demi-ton au-dessus de `c`. `e#` sonne comme `f`, et `b#` comme le do suivant :
à préciser dans la page, pas dans la vidéo. `c1` (33 Hz) ne sort presque pas
d'un haut-parleur de portable : la démo commence à `c2`.

---

**Vérifications avant chaque export**

- chaque ligne de code tapée à l'écran joue bien ce que la voix annonce ;
- sous-titres incrustés et relus (les codes `bd`, `sd`, `hh` sont souvent mal transcrits) ;
- vidéo 1.2 : chaque image est créditée à l'écran et figure dans `sources.yaml`.
