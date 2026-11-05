---
part: "assembler-les-couches"
questions:
  - question: "Dans quel ordre régler les volumes d'un morceau ?"
    options:
      [
        "La batterie d'abord, puis le pad, puis la mélodie, une couche à la fois",
        "Toutes les couches en même temps, jusqu'à ce que ça sonne bien",
        "La mélodie d'abord, en la mettant au volume maximum",
        "Peu importe l'ordre, tant que chaque `.gain()` vaut 1",
      ]
    answer: 0
    explanation: >-
      La batterie sert de référence. On ajoute ensuite une couche à la fois, en
      commentant les autres : on sait toujours quel réglage a changé quoi.
  - question: "La mélodie disparaît sous le reste. Quelle est la meilleure correction ?"
    options:
      [
        "Baisser les couches qui la couvrent, ou monter un peu son `.gain()` sans dépasser 1",
        "Mettre son `.gain()` à 5",
        "Retirer le pad du morceau",
        "Passer tout le morceau en `sine`",
      ]
    answer: 0
    explanation: >-
      Au-delà de 1, le son peut saturer. Pour faire ressortir une couche, on
      baisse d'abord celles qui la couvrent, comme le charleston, qui occupe le
      même registre aigu.
  - question: "Pourquoi écouter aussi son morceau à faible volume ?"
    options:
      [
        "Un déséquilibre s'entend mieux doucement : une couche trop faible disparaît",
        "Pour économiser la batterie de l'ordinateur",
        "Parce que Strudel joue plus juste à faible volume",
        "Ce n'est pas utile, seul le volume maximum compte",
      ]
    answer: 0
    explanation: >-
      À fort volume, tout semble présent. En baissant le son, les couches trop
      faibles disparaissent les premières : c'est un test rapide de l'équilibre.
  - question: "Que fait `<3 5>` dans `n(\"0 2 4 2 <3 5> 2 1 ~\")` ?"
    options:
      [
        "Il joue 3 à un cycle et 5 au suivant : la mélodie varie d'un tour à l'autre",
        "Il joue 3 et 5 en même temps",
        "Il joue 3 puis 5 dans la même case",
        "Il répète la note 3 cinq fois",
      ]
    answer: 0
    explanation: >-
      Les chevrons prennent un élément différent à chaque cycle, ici à
      l'intérieur d'une seule case. Une seule note change, et la boucle devient
      moins répétitive.
---
