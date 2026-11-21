---
part: "reverb-et-delay"
questions:
  - question: "Quelle est la différence entre la reverb et le delay ?"
    options:
      [
        "La reverb simule un lieu, un halo continu ; le delay répète le son en échos distincts",
        "La reverb répète le son, le delay le rend plus aigu",
        "Ce sont deux noms du même effet",
        "La reverb ne s'applique qu'à la batterie, le delay qu'aux synthés",
      ]
    answer: 0
    explanation: >-
      La réverbération reproduit les rebonds d'une salle, fondus en un halo.
      Le delay renvoie des copies du son, séparées et de plus en plus faibles.
  - question: "Que vaut `60 / 128 / 2` dans `.delaytime(60 / 128 / 2)` ?"
    options:
      [
        "Un demi-temps à 128 BPM, en secondes : l'écho retombe en rythme, deux cases après sa note",
        "Le nombre d'échos joués",
        "Le volume de l'écho",
        "La durée d'un cycle entier",
      ]
    answer: 0
    explanation: >-
      `60 / 128` est la durée d'un temps à 128 BPM (0,469 s). Divisée par 2,
      elle donne 0,234 s, soit deux cases du pluck : chaque écho retombe en
      rythme, le plus souvent dans un silence.
  - question: "Pourquoi ne jamais régler `delayfeedback` à 1 ou plus ?"
    options:
      [
        "Chaque écho serait aussi fort que le précédent, ou plus : le son s'accumule sans fin",
        "Strudel refuse les valeurs supérieures à 0,5",
        "L'écho disparaîtrait complètement",
        "Le tempo du morceau doublerait",
      ]
    answer: 0
    explanation: >-
      Le feedback renvoie une part de l'écho dans le suivant. À 1, rien ne
      s'atténue ; au-delà, tout s'amplifie. La documentation de Strudel met en
      garde contre ce réglage.
  - question: "Pourquoi le pad reçoit-il `.orbit(4)` ?"
    options:
      [
        "Pour avoir sa propre reverb, sans la partager avec les autres couches",
        "Pour jouer quatre fois plus vite",
        "Pour jouer sur le quatrième temps",
        "Pour monter d'une octave",
      ]
    answer: 0
    explanation: >-
      Strudel n'a qu'une reverb et un delay par orbite. Si deux couches les
      règlent différemment sur la même orbite, le résultat devient imprévisible.
      Une orbite par couche évite le conflit.
---
