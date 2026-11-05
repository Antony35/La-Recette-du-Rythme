---
part: "ajouter-un-pad"
questions:
  - question: "Que joue `note(\"[d4,f4,a4]\")` ?"
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
  - question: "Dans `n(\"<[0,2,4] [0,2,5]>\")`, combien de temps dure chaque accord ?"
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
  - question: "Vous ajoutez le pad dans le `stack()` de la batterie, qui se termine par `.bank(\"RolandTR808\")`. Le pad se tait, sans message. Pourquoi ?"
    options:
      [
        "`.bank()` préfixe tous les sons du `stack()` : le pad devient `RolandTR808_sine`, qui n'existe pas",
        "Un `stack()` ne peut pas mélanger `s()` et `n()`",
        "Le pad est trop grave pour être entendu sous la batterie",
        "`setcpm()` ne s'applique pas aux synthés",
      ]
    answer: 0
    explanation: >-
      Comme en 2.3, `.bank()` colle le nom de la machine devant le nom du son.
      Sur un synthé, ça donne un son introuvable, donc un silence. La batterie
      garde son propre `stack()` et son `.bank()`, à l'intérieur du grand.
  - question: "Pourquoi l'accord `[0,2,4]` sonne-t-il juste avec le pluck, en gamme de ré mineur ?"
    options:
      [
        "Ses trois notes appartiennent à la gamme de ré mineur, comme celles du pluck",
        "Parce qu'il est joué en `sine`",
        "Parce que tout accord de trois notes sonne juste avec n'importe quelle mélodie",
        "Parce que Strudel accorde automatiquement le pad sur la mélodie",
      ]
    answer: 0
    explanation: >-
      Ré, fa, la : une marche sur deux de la gamme de ré mineur. Comme le
      pluck puise dans la même gamme, accord et mélodie partagent les mêmes
      notes.
---
