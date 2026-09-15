---
part: "test-de-positionnement"

# Un axe `skippable` acquis compte pour sauter la séquence 1. JavaScript ne
# l'est pas : la séquence 1 ne l'enseigne pas, elle le suppose.
axes:
  - id: musique
    label: "Culture musicale"
    threshold: 3
    skippable: true
    advice: >-
      Les sous-séquences 1.4 et 1.5 posent exactement ce vocabulaire : notation
      anglaise, drum kit, puis une gamme jouée note par note.
  - id: mao
    label: "MAO"
    threshold: 3
    skippable: true
    advice: >-
      La sous-séquence 1.4 présente le drum kit (`bd`, `sd`, `hh`) et la 1.3 la
      boucle du REPL. Les filtres reviendront en détail en séquence 4.
  - id: javascript
    label: "JavaScript"
    threshold: 3
    skippable: false
    advice: >-
      Le cours suppose des bases : variables, fonctions, appel de méthode.
      Revois-les avant la séquence 6 — le guide JavaScript de MDN, cité dans la
      page Sources, couvre exactement ce qu'il faut.

questions:
  # --- Culture musicale -------------------------------------------------------
  - axis: musique
    question: "En notation anglaise, quelle lettre désigne le do ?"
    options: ["A", "C", "D", "G"]
    answer: 1
    explanation: >-
      La notation anglaise commence au la : A B C D E F G = la si do ré mi fa
      sol. C'est celle qu'utilise Strudel pour écrire des notes, par exemple
      `note("c e g")`.

  - axis: musique
    question: "Combien de notes différentes compte une gamme majeure, sans répéter la note de départ ?"
    options: ["8", "12", "7", "5"]
    answer: 2
    explanation: >-
      Do ré mi fa sol la si : sept notes. La huitième est la même que la
      première, une octave plus haut. Douze, c'est le nombre de demi-tons dans
      une octave.

  - axis: musique
    question: "Que signifie un tempo de 120 BPM ?"
    options:
      - "120 battements par minute, soit deux par seconde"
      - "120 mesures par minute"
      - "120 notes par mesure"
      - "Un morceau de 120 secondes"
    answer: 0
    explanation: >-
      BPM veut dire « beats per minute ». À 120 BPM, un battement tombe toutes
      les demi-secondes. Strudel raisonne plutôt en cycles, qu'on verra en
      séquence 2, mais le BPM reste la référence de tous les musiciens.

  - axis: musique
    question: "Que devient la fréquence d'une note quand on monte d'une octave ?"
    options:
      - "Elle augmente de 12 Hz"
      - "Elle est multipliée par 12"
      - "Elle ne change pas, seul le timbre change"
      - "Elle double"
    answer: 3
    explanation: >-
      Le la de référence (A4) vibre à 440 Hz, celui de l'octave au-dessus (A5)
      à 880 Hz. C'est pour ça que deux notes à l'octave semblent « la même
      note » : leurs vibrations coïncident une fois sur deux.

  # --- MAO ----------------------------------------------------------------------
  - axis: mao
    question: "Dans une boîte à rythmes, que désigne l'abréviation `bd` ?"
    options:
      - "Le « bass drum », la grosse caisse"
      - "La basse synthétique"
      - "Le « beat duration », la durée d'un temps"
      - "La caisse claire"
    answer: 0
    explanation: >-
      `bd` = bass drum, la grosse caisse. Avec `sd` (snare drum, la caisse
      claire) et `hh` (hi-hat, la charleston), c'est le trio de base de toute
      rythmique — et exactement ce que tu écriras dans `s("bd sd hh")`.

  - axis: mao
    question: "Qu'est-ce qu'un sample ?"
    options:
      - "Un synthétiseur qui calcule le son en temps réel"
      - "Une partition au format MIDI"
      - "Un court enregistrement audio, rejoué à la demande"
      - "Un réglage de volume appliqué à une piste"
    answer: 2
    explanation: >-
      Un sample est un fichier son : un coup de caisse claire, une note de
      piano enregistrée. Un synthétiseur, lui, calcule le son. Strudel sait
      faire les deux : `s("bd")` joue un sample, `note("c").s("sawtooth")` un
      oscillateur.

  - axis: mao
    question: "La TR-808 et la TR-909 sont…"
    options:
      - "des synthétiseurs modulaires Moog"
      - "des boîtes à rythmes Roland"
      - "des logiciels de MAO"
      - "des formats de fichiers audio"
    answer: 1
    explanation: >-
      Deux boîtes à rythmes Roland du début des années 1980, omniprésentes en
      hip-hop, house et techno. Strudel en embarque les sons :
      `.bank("RolandTR909")` change de kit sans toucher au rythme.

  - axis: mao
    question: "Que fait un filtre passe-bas ?"
    options:
      - "Il baisse le volume général"
      - "Il laisse passer les aigus et atténue les graves"
      - "Il laisse passer les graves et atténue les aigus"
      - "Il ralentit le tempo"
    answer: 2
    explanation: >-
      « Passe-bas » : ce qui est sous la fréquence de coupure passe, le reste
      est atténué. Le son devient plus sourd, plus rond. Son inverse est le
      passe-haut ; les deux reviennent en séquence 4.

  # --- JavaScript ---------------------------------------------------------------
  - axis: javascript
    question: "Avec `function double(n) { return n * 2; }`, que vaut `double(4)` ?"
    options: ["`4`", "`8`", "`undefined`", '`"44"`']
    answer: 1
    explanation: >-
      `return` renvoie la valeur calculée : 4 × 2 = 8. Sans `return`, la
      fonction s'exécuterait quand même, mais renverrait `undefined`.

  - axis: javascript
    question: "Avec `const add = (a, b) => a + b;`, que vaut `add(2, 3)` ?"
    options:
      - '`"23"`'
      - "`undefined`, faute de `return`"
      - "`5`"
      - "Une erreur de syntaxe"
    answer: 2
    explanation: >-
      Une fonction fléchée dont le corps est une simple expression, sans
      accolades, renvoie cette expression implicitement. Avec des accolades,
      il faudrait écrire `return`. Et `"23"` serait le résultat avec deux
      chaînes, pas deux nombres.

  - axis: javascript
    question: 'Dans `s("bd*4").bank("RolandTR909")`, que fait le point avant `bank` ?'
    options:
      - 'Il appelle la méthode `bank` sur la valeur renvoyée par `s("bd*4")`'
      - "Il sépare deux instructions indépendantes"
      - "Il concatène deux chaînes de caractères"
      - "Il déclare une propriété nommée `bank`"
    answer: 0
    explanation: >-
      C'est un chaînage de méthodes : `s()` renvoie un objet — un pattern — et
      `.bank()` s'applique à cet objet pour en renvoyer un nouveau. Presque
      tout Strudel s'écrit de cette façon.

  - axis: javascript
    question: "Que produit `const tempo = 120; tempo = 130;` ?"
    options:
      - "`tempo` vaut 130"
      - "`tempo` vaut toujours 120, sans erreur"
      - "Les deux valeurs sont gardées"
      - "Une `TypeError` : on ne réaffecte pas une constante"
    answer: 3
    explanation: >-
      `const` interdit la réaffectation ; pour une valeur qui change, c'est
      `let`. Attention : `const` protège la variable, pas le contenu d'un
      objet — `const kit = []` accepte encore `kit.push("bd")`.
---
