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
  - question: "Dans `note(\"a3 c4\")`, de combien `c4` est-il au-dessus de `a3` ?"
    options:
      [
        "De deux notes seulement : la, si, do",
        "D'une octave entière",
        "De deux octaves",
        "Il est en dessous de `a3`",
      ]
    answer: 0
    explanation: >-
      Le chiffre d'octave change sur le do, pas sur le la. `a3`, `b3`, puis
      `c4` : malgré le changement de chiffre, ce sont trois notes voisines.
  - question: "Comment jouer `note(\"e4 g4 a4\")` une octave plus haut ?"
    options:
      [
        "`note(\"e5 g5 a5\")`",
        "`note(\"f4 a4 b4\")`",
        "`note(\"e4 g4 a4 e5\")`",
        "`note(\"e8 g8 a8\")`",
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
---
