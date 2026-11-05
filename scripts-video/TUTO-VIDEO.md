# Tutoriel : faire une vidéo de sous-séance

Écrit pour la **vidéo 1.2** (images, frise et voix off), puis adapté aux vidéos
de live coding (à partir de la 1.3). Logiciels : **Audacity** pour la voix,
**Kdenlive** pour le montage et les sous-titres, **OBS Studio** pour les
captures d'écran. Kdenlive et OBS sont déjà installés.

Comptez **3 à 4 heures** pour la première vidéo. Elles iront beaucoup plus vite
ensuite.

## La méthode en une phrase

**On enregistre la voix d'abord, et on monte les images dessus.** C'est la voix
qui donne le rythme : une image reste à l'écran le temps de la phrase qui en
parle. Pas besoin de diaporama ni de capture d'écran pour la 1.2 : les images
vont directement dans Kdenlive.

---

## Étape 0 — Préparer (20 min)

### Installer Audacity

```bash
flatpak install flathub org.audacityteam.Audacity
```

### Choisir le micro

**Le micro-cravate sans fil** (lavalier) est le bon choix pour une voix off. Il
ne passe pas par le Bluetooth : son **récepteur se branche en USB** et le PC le
voit comme une carte son.

- **Chargez l'émetteur et le récepteur** avant de commencer : une batterie
  faible produit des coupures.
- Branchez le récepteur (adaptateur USB-C ↔ USB-A si besoin), allumez
  l'émetteur, et attendez que le voyant indique la connexion.
- Dans Audacity, choisissez comme entrée **le périphérique USB** du récepteur,
  **pas** « Mic1 » (le micro intégré), « Headset », ni un appareil Bluetooth.
- **Placement** : pincé au milieu de la poitrine, à **15–20 cm sous le
  menton**, sur un tee-shirt plutôt qu'un pull. **Ne le touchez plus** et
  évitez le frottement du tissu ou d'un collier : c'est le bruit typique des
  micros-cravates.
- Si le micro a un bouton de **réduction de bruit**, essayez avec et sans sur
  10 secondes. Le réglage le plus fort rend souvent la voix métallique ; dans
  une pièce calme, la réduction d'Audacity suffit.
- Faites un **essai de 30 secondes** et réécoutez-le au casque avant
  d'enregistrer pour de bon.

N'utilisez **jamais un casque Bluetooth comme micro** : dès que son micro est actif,
il passe en qualité téléphone.

### Ranger le dossier

Tout vit dans `~/Documents/FYC`, une séquence par dossier, une vidéo par
sous-dossier, et toujours les mêmes cinq sous-dossiers, dans l'ordre du travail :

```
FYC/
├── _commun/sons-batterie/            les sons du site, pour toutes les vidéos
└── S2-rythme/
    └── 2.1-premiers-sons/
        ├── 1-voix/       projet Audacity (.aup3) et voix exportée (voix.wav)
        ├── 2-captures/   enregistrements OBS de Strudel
        ├── 3-images/     images à monter (source/ : de quoi les refaire)
        ├── 4-montage/    le projet Kdenlive, au nom de la vidéo
        └── 5-export/     la vidéo finale, au même nom que sur le site
```

**Enregistrez le projet Kdenlive (`Ctrl + S`) dès qu'il est créé**, dans
`4-montage/`, avant de poser le premier clip. Kdenlive ne fait de copies de
secours que d'un projet déjà enregistré : les montages de la 1.3 et de la 1.4,
jamais enregistrés, sont perdus.

Kdenlive retient le chemin complet de chaque fichier : ne déplacez plus rien
une fois le montage commencé.

### Exporter la frise depuis Excalidraw

Ouvrez la frise en plein écran, puis **Exporter l'image → PNG**, avec
l'**échelle 3×** et le **fond blanc**. Une seule grande image suffit : dans
Kdenlive, on se déplacera dessus étape par étape (voir l'étape 2).

---

## Étape 1 — Enregistrer la voix (45 min)

### La pièce et la position

- Une pièce meublée (rideaux, canapé, lit) : une pièce vide résonne.
- Le micro-cravate pincé sur la poitrine, comme indiqué plus haut : bien placé,
  il ne capte ni le souffle des « p » ni celui des « b ».
- Le script **imprimé ou sur un deuxième écran**, pas sur l'écran où l'on clique.
- Un verre d'eau. Coupez les notifications et le chauffage soufflant.

### Les réglages d'Audacity

- En bas à gauche : **fréquence du projet 48000 Hz**.
- Dans la barre d'outils, choisissez l'entrée micro, puis le canal **mono (1)**.
- Parlez normalement et regardez le vumètre : les pics doivent monter vers
  **−12 dB** et ne jamais toucher le rouge. Sinon, réglez le volume d'entrée.

### Enregistrer

1. Lancez l'enregistrement et **restez silencieux 5 secondes**. Ce silence
   servira à retirer le bruit de fond.
2. Lisez le script, plan par plan.
3. **En cas d'erreur, ne vous arrêtez pas** : marquez 2 secondes de silence,
   puis reprenez **toute la phrase** depuis le début. Les longs silences se
   repèrent facilement sur la forme d'onde au moment de couper.
4. Parlez **un peu plus lentement** que d'habitude, en souriant : ça s'entend.

Enregistrez le projet Audacity tout de suite (`voix/1.2-brut.aup3`).

### Nettoyer, dans cet ordre

1. **Réduire le bruit** : sélectionnez les 5 secondes de silence, puis
   *Effet → Réduction du bruit → Prendre le profil du bruit*. Sélectionnez
   ensuite tout (`Ctrl + A`), puis *Effet → Réduction du bruit* avec
   **12 dB**, et validez. Au-delà, la voix devient métallique.
2. **Couper les erreurs** : pour chaque phrase ratée, sélectionnez-la à la
   souris et appuyez sur `Suppr`. Écoutez chaque coupe.
3. **Raccourcir les silences** : gardez environ une demi-seconde entre deux
   phrases, et une seconde entre deux plans.
4. **Égaliser le volume** : tout sélectionner, puis
   *Effet → Normalisation de la sonie*, **−16 LUFS**. C'est le niveau standard
   des vidéos web, et toutes les vidéos du cours auront ainsi le même volume.

### Exporter

*Fichier → Exporter l'audio → WAV, 48000 Hz* : `voix/1.2-voix.wav`.
Pas de MP3 à cette étape : on compressera une seule fois, à la fin.

---

## Étape 2 — Monter dans Kdenlive (1 h 30)

### Créer le projet

*Fichier → Nouveau*. Dans les paramètres du projet, choisissez
**1920 × 1080, 30 images/s**. Enregistrez tout de suite dans `projet/`.

### Importer

Glissez dans le **chutier** (le panneau des fichiers, en haut à gauche) la voix,
les images et la frise.

### Poser la voix en premier

Glissez `1.2-voix.wav` sur la **piste audio A1**, au tout début. C'est la
colonne vertébrale de la vidéo : on ne la déplace plus.

**Posez des marqueurs** : écoutez la voix, et à chaque changement d'image
(« En 1957… », « Ensuite viennent les synthés… »), placez un marqueur
(clic droit sur la règle du temps → *Ajouter un marqueur*). Les images
viendront se caler dessus.

### Poser les images

- Glissez chaque image sur la **piste vidéo V1**, dans l'ordre du script.
- Étirez ou raccourcissez chaque image par son bord, jusqu'au marqueur suivant.
- Le crédit doit rester **à l'écran tant que l'image est visible**.

### Donner du mouvement : un zoom lent

Une photo immobile pendant 30 secondes paraît figée. Sur chaque photo :

1. Ajoutez l'effet **Transformer** (onglet *Effets*, recherche « transform »).
2. Sur la **première image clé**, la taille est à 100 %. Allez à la **fin du
   clip** et ajoutez une image clé, avec une taille de **108 à 110 %**.

Le mouvement doit rester **à peine perceptible**. Gardez le même effet sur toutes
les photos.

### La frise : se déplacer dessus

Posez la grande image de la frise une seule fois, puis utilisez **Transformer**
avec une image clé par étape. Pour chaque date prononcée, cadrez la carte
concernée, en zoom. Kdenlive glisse tout seul d'une carte à l'autre, au moment
où la voix en parle. Terminez par une vue d'ensemble de la frise entière.

### Les crédits à l'écran

*Projet → Ajouter un titre*. Petit texte blanc avec un contour noir, en bas à
gauche :

```
Photo : Rama, CC BY-SA 2.0 fr, via Wikimedia Commons
```

Placez-le sur la **piste V2**, au-dessus de l'image concernée, sur toute sa
durée. Pour les crédits suivants, dupliquez ce titre et modifiez le texte :

| Image | Crédit à afficher |
|---|---|
| tambour de l'ILLIAC | Photo : Rama, CC BY-SA 2.0 fr, via Wikimedia Commons |
| synthé modulaire | Photo : Kazuhisa Otsubo, CC BY 2.0, via Wikimedia Commons |
| algorave | Photo : Antonio Roberts, CC BY-SA 2.0, via Wikimedia Commons |
| LMMS | (CC0 : aucun crédit obligatoire) |
| votre capture de Strudel | (rien, c'est la vôtre) |

Si vous rognez une photo sous **BY-SA**, ajoutez « rognée » à la fin du crédit.

### Les transitions

Un seul type, partout : un **fondu enchaîné** d'environ **0,5 seconde**
entre deux images (glissez un clip pour qu'il chevauche légèrement le
précédent, puis *Ajouter une transition*). Pas d'effets de volets ni de rotations.

---

## Étape 3 — Les sous-titres (45 min)

Deux solutions possibles :

- **Kdenlive** : *Projet → Sous-titres → Reconnaissance vocale*. La première
  fois, Kdenlive propose de télécharger le moteur de reconnaissance (Whisper) :
  acceptez. Les sous-titres apparaissent alors sur une piste dédiée. Tout se fait
  au même endroit.
- **Jitter**, comme pour les deux premières vidéos. C'est utile si vous voulez
  **exactement le même style** de sous-titres que celles-ci.

**Faites un essai avec Kdenlive sur cette vidéo.** Si le rendu se rapproche assez
de celui des deux premières vidéos, gardez-le. Sinon, passez par Jitter.

Dans les deux cas :

- **relisez chaque sous-titre avec le script sous les yeux** : les noms propres
  (Hiller, Isaacson, TOPLAP, TidalCycles, Strudel) seront mal reconnus ;
- **deux lignes au maximum** par sous-titre, et pas plus d'environ 40 caractères
  par ligne ;
- un style lisible : police sans empattement, blanc avec un contour noir, en bas
  au centre, **sans masquer les crédits** (placez les crédits en haut si besoin).

Les sous-titres doivent être **incrustés dans l'image**, pas fournis à côté :
c'est ce qui permet de les garder sur Moodle. Après l'export, regardez les
premières secondes du fichier pour vérifier qu'ils sont bien dans la vidéo.

---

## Étape 4 — Exporter (10 min)

Bouton **Rendu** :

- format **MP4 (H.264 + AAC)** ;
- 1920 × 1080, 30 images/s ;
- qualité : réglez-la pour rester **sous environ 15 Mo par minute**. Les deux
  vidéos déjà en ligne font environ 33 et 38 Mo ;
- nom du fichier : **le slug de la sous-séance**, `histoire-du-live-coding.mp4`.

---

## Étape 5 — Vérifier avant de livrer

- [ ] Vous avez regardé la vidéo en entier, **au casque**, puis **sur les
      haut-parleurs du portable**.
- [ ] La voix est claire, sans souffle, et au même volume du début à la fin.
- [ ] Chaque photo affiche son crédit tant qu'elle est à l'écran.
- [ ] Les sous-titres sont incrustés, relus, et ne masquent rien.
- [ ] La vidéo dure 3 min 30 au maximum.

Ensuite, déposez le fichier dans `public/videos/`. Sur la page, l'emplacement
« Ici vidéo » est remplacé par le lecteur, et les crédits des images sont
ajoutés à `sources.yaml`.

---

## Les vidéos de live coding (à partir de la 1.3)

Même méthode, mais on capture l'écran avec **OBS Studio**.

### Régler OBS une fois pour toutes

- *Paramètres → Vidéo* : base et sortie en **1920 × 1080**, **30 images/s**.
- *Paramètres → Sortie* : format d'enregistrement **MKV**. Si OBS plante, un
  MKV reste lisible, alors qu'un MP4 serait perdu. Ensuite,
  *Fichier → Remuxer des enregistrements* le convertit en MP4 sans perte.
- *Sources* : **Capture d'écran (PipeWire)**, puisque vous êtes sous Wayland.
  Une fenêtre du système demande quoi partager : choisissez **la fenêtre du
  navigateur**, pas l'écran entier.
- Le **son de l'ordinateur** (Strudel) est capturé sur une piste, et le **micro**
  sur une autre, pour pouvoir régler leurs volumes séparément au montage.

### Pendant l'enregistrement

- Navigateur zoomé à **150 %**, onglets et favoris masqués (`F11`).
- Faites un **passage à blanc** avant d'enregistrer, pour que les sons soient
  déjà chargés.
- Vous pouvez parler **en même temps** que vous codez (plus naturel), ou
  enregistrer **la voix après**, sur l'image (plus propre). Commencez par la
  première solution ; si vous butez trop, passez à la seconde.

### Au montage

Au moment où vous parlez, baissez la musique de Strudel **sous la voix**, autour
de −20 dB. Pour cela, réglez le volume du clip son dans Kdenlive, avec des
images clés.
