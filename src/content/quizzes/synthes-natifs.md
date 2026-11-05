---
part: "synthes-natifs"
questions:
  - question: "Quel synthé Strudel utilise-t-il pour un `note()` écrit sans `s()` ?"
    options:
      [
        "`triangle`",
        "`sine`",
        "`sawtooth`",
        "Aucun : il ne joue rien sans `s()`",
      ]
    answer: 0
    explanation: >-
      `triangle` est le synthé par défaut. `s()` ne sert qu'à en choisir un
      autre : `sine`, `square` ou `sawtooth`.
  - question: "Vous écrivez `note(\"d4 e4\").s(\"sinus\")`. Que se passe-t-il ?"
    options:
      [
        "Rien ne sonne, sans message d'erreur : le nom attendu est `sine`",
        "Strudel corrige tout seul en `sine`",
        "Strudel affiche une erreur de syntaxe",
        "Strudel joue la mélodie avec le synthé par défaut",
      ]
    answer: 0
    explanation: >-
      Les noms de synthés sont en anglais. Strudel cherche un son appelé
      `sinus`, ne le trouve pas et se tait : les notes s'encadrent, mais rien
      ne sort. C'est le même piège que `pc` au lieu de `cp` en 2.5.
  - question: "Quel synthé donne le son le plus brillant et le plus agressif ?"
    options:
      [
        "`sawtooth`, l'onde en dents de scie",
        "`sine`, la sinusoïde",
        "`triangle`, l'onde triangulaire",
        "Ils sonnent tous pareil, seul le volume change",
      ]
    answer: 0
    explanation: >-
      Plus la forme d'onde est anguleuse, plus le son est riche et brillant.
      La dent de scie est la plus anguleuse des quatre : c'est elle qu'on
      adoucira avec des filtres en séquence 4.
  - question: "Dans `.s(\"<sine triangle square sawtooth>\")`, que font les chevrons `< >` ?"
    options:
      [
        "Ils prennent un synthé différent à chaque cycle",
        "Ils jouent les quatre synthés en même temps",
        "Ils jouent les quatre synthés à la suite dans chaque cycle",
        "Ils choisissent un synthé au hasard à chaque note",
      ]
    answer: 0
    explanation: >-
      Les chevrons avancent d'un élément à chaque tour : un cycle en `sine`,
      le suivant en `triangle`, et ainsi de suite. C'est la même écriture qui
      fera alterner les accords du pad en 3.5.
---
