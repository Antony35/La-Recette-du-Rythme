---
part: "resonance"
questions:
  - question: "Où agit la résonance d'un filtre ?"
    options:
      [
        "Autour de la fréquence de coupure, qu'elle renforce",
        "Sur toutes les fréquences de la même façon",
        "Uniquement sur les notes les plus graves",
        "Sur la durée des notes",
      ]
    answer: 0
    explanation: >-
      La résonance accentue les fréquences situées juste autour de la coupure.
      C'est pour cela qu'elle s'entend surtout quand la coupure bouge.
  - question: "Que donne `.lpf(1000).lpq(0)` ?"
    options:
      [
        "Un passe-bas neutre : il atténue les aigus sans rien accentuer",
        "Un pad muet",
        "Un pad sifflant",
        "Une erreur : la résonance ne peut pas valoir 0",
      ]
    answer: 0
    explanation: >-
      À 0, la résonance n'ajoute rien : le filtre se contente de retirer les
      aigus. C'est en montant `lpq` qu'il prend du caractère.
  - question: "Un réglage de résonance vous fait sursauter. Que faire d'abord ?"
    options:
      [
        "Baisser la résonance : c'est elle qui ajoute du volume",
        "Baisser le `.gain()` de la couche et garder la résonance",
        "Monter la fréquence de coupure au maximum",
        "Retirer le filtre",
      ]
    answer: 0
    explanation: >-
      La résonance renforce des fréquences, donc elle ajoute du volume. Compenser
      avec le gain cache le problème au lieu de le régler.
  - question: "Comment régler la résonance d'un passe-haut `.hpf()` ?"
    options:
      [
        "Avec `.hpq()`",
        "Avec `.lpq()`, qui sert aux deux filtres",
        "Avec `.room()`",
        "Un passe-haut n'a pas de résonance",
      ]
    answer: 0
    explanation: >-
      Chaque filtre a sa résonance : `lpq` pour le passe-bas, `hpq` pour le
      passe-haut. Le q vient de « facteur Q », le nom technique de la résonance.
---
