---
part: "enveloppe-attack-decay"
questions:
  - question: "Que change `.attack(0.5)` sur une note ?"
    options:
      [
        "Le son met une demi-seconde à atteindre son volume maximal",
        "La note dure exactement une demi-seconde",
        "Le son est joué deux fois moins fort",
        "La note démarre une demi-seconde en retard, puis claque",
      ]
    answer: 0
    explanation: >-
      L'attaque est un temps de montée. À `0.005`, le son claque ; à `0.5`, il
      arrive progressivement, comme un violon joué à l'archet.
  - question: "Dans `slider(0.005, 0, 0.5)`, que désignent les trois nombres ?"
    options:
      [
        "La valeur de départ, le minimum et le maximum du curseur",
        "Le minimum, la valeur de départ et le maximum",
        "L'attaque, le decay et le sustain",
        "La largeur du curseur, sa position et sa couleur",
      ]
    answer: 0
    explanation: >-
      Le premier nombre est la valeur de départ : c'est lui qui change dans le
      code quand on déplace le curseur. Les deux suivants bornent sa course.
  - question: "Une note du pluck dure environ 0,12 seconde. Que se passe-t-il avec `.attack(0.5)` ?"
    options:
      [
        "La note se termine avant d'avoir fini de monter : elle sonne nettement plus faible",
        "Strudel allonge la note jusqu'à 0,5 seconde",
        "La note est jouée normalement, l'attaque est ignorée",
        "Strudel affiche une erreur dans l'éditeur",
      ]
    answer: 0
    explanation: >-
      L'attaque ne rallonge pas la note. Si elle est plus longue que la note, le
      son est coupé en pleine montée : il n'atteint jamais son volume maximal.
  - question: "Avec `.sustain(0)`, à quoi sert `decay` ?"
    options:
      [
        "Il fixe le temps que met le son à retomber jusqu'au silence : la longueur de la note",
        "Il règle le volume de la note",
        "Il retarde le début de la note",
        "Il n'a aucun effet tant que le sustain vaut 0",
      ]
    answer: 0
    explanation: >-
      Le decay fait redescendre le son jusqu'au niveau de sustain. Si ce niveau
      est 0, la chute va jusqu'au silence : c'est le réglage typique d'un son
      percussif comme le pluck.
---
