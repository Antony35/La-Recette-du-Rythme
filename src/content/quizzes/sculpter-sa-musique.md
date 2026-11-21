---
part: "sculpter-sa-musique"
questions:
  - question: "Que fait `pluck:` au début d'une ligne ?"
    options:
      [
        "Il déclare un bloc nommé `pluck`, joué en même temps que les autres blocs",
        "Il crée une variable `pluck`, réutilisable dans les autres blocs",
        "Il transforme la ligne en commentaire",
        "Il applique un effet à tout le morceau",
      ]
    answer: 0
    explanation: >-
      `pluck:` est un label JavaScript que Strudel détourne pour déclarer un
      bloc. Ce n'est pas une variable : écrire `pluck` dans un autre bloc
      provoque l'erreur « pluck is not defined ».
  - question: "Comment couper le pad sans effacer son code ?"
    options:
      [
        "Écrire `_pad:` au lieu de `pad:`, puis réévaluer",
        "Mettre son `.gain()` à 10",
        "Supprimer son `.orbit()`",
        "Écrire un second bloc `pad:` vide",
      ]
    answer: 0
    explanation: >-
      Un tiret bas devant le nom met le bloc en sourdine. Son code reste en
      place : on le rallume en retirant le tiret bas.
  - question: "Pourquoi déplacer un seul curseur à la fois ?"
    options:
      [
        "Pour savoir quel réglage a produit quel changement",
        "Parce que Strudel ignore le second curseur",
        "Pour éviter une erreur de syntaxe",
        "Parce que les curseurs se bloquent mutuellement",
      ]
    answer: 0
    explanation: >-
      Deux réglages modifiés ensemble mélangent leurs effets à l'oreille. Un
      seul à la fois, c'est la même méthode que pour les volumes en 3.6.
  - question: "Avec des blocs séparés, pourquoi le `.bank()` de la batterie ne rend-il plus les synthés muets ?"
    options:
      [
        "Il ne s'applique qu'au bloc de la batterie : les synthés sont dans d'autres blocs",
        "Parce qu'un bloc nommé désactive `.bank()`",
        "Parce que les synthés sont sur d'autres orbites",
        "Il les rendait muets uniquement à cause de `stack()` mal écrit",
      ]
    answer: 0
    explanation: >-
      Une fonction enchaînée ne touche que le motif sur lequel elle est
      appelée. Chaque bloc nommé est un motif séparé : la batterie peut porter
      son `.bank()` sans que `sine` ou `sawtooth` soient cherchés dans la
      banque de la TR-808.
---
