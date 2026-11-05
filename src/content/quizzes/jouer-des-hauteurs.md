---
part: "jouer-des-hauteurs"
questions:
  - question: "Quelle est la différence entre `s(\"bd\")` et `note(\"c4\")` ?"
    options:
      [
        "`s()` choisit un son, `note()` choisit une hauteur jouée par un synthétiseur",
        "Aucune : ce sont deux noms pour la même fonction",
        "`note()` ne fonctionne qu'à l'intérieur d'un `stack()`",
        "`s()` joue plus fort que `note()`",
      ]
    answer: 0
    explanation: >-
      Avec `s()`, on désigne un son enregistré, comme une grosse caisse. Avec
      `note()`, on désigne une hauteur précise, que Strudel joue avec un synthé
      (`triangle` par défaut).
  - question: "Dans `note(\"b3 c4\")`, de combien `c4` est-il au-dessus de `b3` ?"
    options:
      [
        "D'une seule note : si, puis do, deux notes voisines",
        "D'une octave entière",
        "De deux octaves",
        "Il est en dessous de `a3`",
      ]
    answer: 0
    explanation: >-
      Le chiffre d'octave change sur le do. `b3` est la dernière note de
      l'octave 3, `c4` la première de l'octave 4 : malgré le changement de
      chiffre, elles sont voisines.
  - question: "Comment jouer `note(\"d4 f4 a4\")` une octave plus haut ?"
    options:
      [
        "`note(\"d5 f5 a5\")`",
        "`note(\"e4 g4 b4\")`",
        "`note(\"d4 f4 a4 d5\")`",
        "`note(\"d8 f8 a8\")`",
      ]
    answer: 0
    explanation: >-
      Transposer d'une octave, c'est ajouter 1 à chaque chiffre sans toucher
      aux lettres. Changer les lettres changerait la mélodie elle-même.
  - question: "Sans chiffre, dans quelle octave Strudel joue-t-il `note(\"c e g\")` ?"
    options:
      [
        "Dans l'octave 3",
        "Dans l'octave 0, la plus grave",
        "Dans l'octave 4",
        "Dans une octave tirée au hasard à chaque cycle",
      ]
    answer: 0
    explanation: >-
      Sans chiffre, `c` équivaut à `c3`. C'est pour ça qu'en séquence 1, il
      fallait écrire `c4` pour refermer la gamme une octave plus haut.
  - question: "Que change le `~` dans `note(\"d4 ~ e4 ~ f4 ~ a4 ~\")` par rapport à `note(\"d4 e4 f4 a4\")` ?"
    options:
      [
        "Les notes tombent aux mêmes instants, mais deviennent courtes et détachées",
        "Les notes jouent une octave plus bas",
        "Le motif dure deux cycles au lieu d'un",
        "Rien : `~` est ignoré dans `note()`",
      ]
    answer: 0
    explanation: >-
      `note()` lit la mini-notation comme `s()`. Chaque `~` prend la moitié de
      la place d'une note : elle commence au même moment, mais s'arrête plus
      tôt. C'est ce qui donne au pluck ses notes pincées.
---
