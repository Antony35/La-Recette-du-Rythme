---
part: "superposer-des-pistes"
questions:
  - question: "Quelle différence entre `s(\"bd sd\")` et `s(\"bd, sd\")` ?"
    options:
      [
        "Le premier joue les deux sons l'un après l'autre, le second les joue en même temps",
        "Aucune : la virgule est optionnelle",
        "Le second joue les deux sons deux fois plus vite",
        "Le second est invalide, la virgule ne s'écrit qu'avec `stack()`",
      ]
    answer: 0
    explanation: >-
      L'espace met à la suite, la virgule superpose. C'est le symbole qui fait
      passer d'une ligne mélodique à une batterie : plusieurs couches qui
      découpent le même cycle chacune à sa façon.
  - question: "Dans la piste `s(\"~ sd\")`, à quoi sert le `~` ?"
    options:
      [
        "À placer la caisse claire sur la seconde moitié du cycle",
        "À faire attendre un cycle entier avant de démarrer",
        "À baisser le volume de la caisse claire",
        "À séparer cette piste de la précédente",
      ]
    answer: 0
    explanation: >-
      Dans une couche superposée, le silence ne fait pas patienter : il
      **positionne**. C'est la façon d'écrire « ce son tombe là », sans avoir à
      calculer de décalage.
  - question: "Pourquoi préférer `stack()` à la virgule quand les pistes se multiplient ?"
    options:
      [
        "Parce que chaque piste est sur sa ligne et peut recevoir ses propres fonctions, comme un `.bank()` différent",
        "Parce que la virgule est limitée à trois couches",
        "Parce que `stack()` synchronise les pistes, contrairement à la virgule",
        "Parce que `stack()` est plus rapide à l'exécution",
      ]
    answer: 0
    explanation: >-
      Les deux écritures sont équivalentes pour superposer. Mais un `.bank()`
      posé à la fin d'une chaîne s'applique à tout : pour donner une 808 à la
      seule caisse claire, il faut que chaque piste soit une expression séparée.
  - question: "Votre rythme s'est « aplati » : les sons s'enchaînent au lieu de se superposer, sans aucun message d'erreur. Que cherchez-vous ?"
    options:
      [
        "Une virgule oubliée : sans elle, le motif reste parfaitement valide, il enchaîne simplement",
        "Un crochet non refermé",
        "Un nom de son mal orthographié",
        "Un `.bank()` qui ne contient pas tous les sons",
      ]
    answer: 0
    explanation: >-
      `s("bd*2 ~ sd")` est un motif correct : Strudel n'a aucune raison de se
      plaindre. C'est le genre de panne qui ne se détecte qu'à l'oreille — et
      qui se corrige en comptant ses virgules.
---
