---
part: "assembler-les-couches"
questions:
  - question: "Dans quel ordre régler les volumes d'un morceau ?"
    options:
      [
        "La batterie d'abord, puis le pad, puis le pluck, une couche à la fois",
        "Toutes les couches en même temps, jusqu'à ce que ça sonne bien",
        "Le pluck d'abord, en le mettant au volume maximum",
        "Peu importe l'ordre, tant que chaque `.gain()` vaut 1",
      ]
    answer: 0
    explanation: >-
      La batterie sert de référence. On ajoute ensuite une couche à la fois, en
      commentant les autres : on sait toujours quel réglage a changé quoi.
  - question: "Le pluck disparaît sous le reste. Quelle est la meilleure correction ?"
    options:
      [
        "Baisser les couches qui le couvrent, ou monter un peu son `.gain()` sans dépasser 1",
        "Mettre son `.gain()` à 5",
        "Retirer le pad du morceau",
        "Passer tout le morceau en `sine`",
      ]
    answer: 0
    explanation: >-
      Au-delà de 1, le son peut saturer. Pour faire ressortir une couche, on
      baisse d'abord celles qui la couvrent, comme le clap et le charleston, qui
      occupent le même registre.
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
  - question: "Le morceau tourne sur deux cycles. Que fait le pad pendant le second ?"
    options:
      [
        "Il joue les quatre notes du pluck sur la première moitié, puis tient le second accord",
        "Il se tait pour laisser la place au pluck",
        "Il rejoue le premier accord une octave plus haut",
        "Il joue les deux accords en même temps",
      ]
    answer: 0
    explanation: >-
      Dans `<[0,2,4] [[0 ~ 1 ~ 2 ~ 4 ~] [0,2,5]]>`, les chevrons prennent le
      second élément au second cycle. Les crochets le coupent en deux moitiés :
      d'abord les quatre notes, puis l'accord `[0,2,5]`.
---
