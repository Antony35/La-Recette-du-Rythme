---
part: "ajouter-un-pad"
questions:
  - question: "Que joue `note(\"[a2,c3,e3]\")` ?"
    options:
      [
        "Les trois notes en même temps : un accord",
        "Les trois notes l'une après l'autre",
        "Une seule note, choisie au hasard parmi les trois",
        "Les trois notes, une par cycle",
      ]
    answer: 0
    explanation: >-
      Entre crochets, la virgule superpose les notes, comme elle superposait
      les pistes en séquence 2. Trois notes jouées ensemble forment un accord.
  - question: "Dans `note(\"<[a2,c3,e3] [f2,a2,c3]>\")`, combien de temps dure chaque accord ?"
    options:
      [
        "Un cycle entier : les chevrons en jouent un par cycle",
        "Un demi-cycle : les deux accords se partagent le cycle",
        "Un quart de cycle",
        "Les deux accords jouent en même temps, pendant tout le cycle",
      ]
    answer: 0
    explanation: >-
      Les chevrons avancent d'un élément à chaque tour. Le premier accord
      remplit le premier cycle, le second le cycle suivant, puis on recommence.
  - question: "Lequel de ces choix rend un pad plus discret sous la rythmique ?"
    options:
      [
        "Un synthé rond (`triangle`), un registre grave et un `.gain()` réduit",
        "Le synthé `sawtooth` dans l'octave 5",
        "Un `.gain(2)` pour qu'il s'entende bien",
        "Des accords qui changent à chaque note de charleston",
      ]
    answer: 0
    explanation: >-
      Un pad remplit l'espace sans attirer l'attention. Un synthé doux, dans le
      grave et à volume réduit, reste en fond ; un `sawtooth` aigu et fort
      prendrait toute la place.
  - question: "Pourquoi l'accord `[a2,c3,e3]` sonne-t-il juste avec une mélodie en gamme de la mineur ?"
    options:
      [
        "Ses trois notes appartiennent à la gamme de la mineur",
        "Parce qu'il est joué dans le grave",
        "Parce que tout accord de trois notes sonne juste avec n'importe quelle mélodie",
        "Parce que Strudel accorde automatiquement le pad sur la mélodie",
      ]
    answer: 0
    explanation: >-
      La, do, mi : une note sur deux de la gamme de la mineur. Comme la mélodie
      puise dans la même gamme, accord et mélodie partagent les mêmes notes.
---
