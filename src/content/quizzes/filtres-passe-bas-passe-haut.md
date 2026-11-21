---
part: "filtres-passe-bas-passe-haut"
questions:
  - question: "Que fait `.lpf(1000)` ?"
    options:
      [
        "Il laisse passer les fréquences sous 1000 Hz et atténue les aigus au-dessus",
        "Il coupe toutes les fréquences sous 1000 Hz",
        "Il monte le volume de 1000 %",
        "Il transpose le son vers le grave",
      ]
    answer: 0
    explanation: >-
      `lpf` est le passe-bas (low-pass filter) : son nom dit ce qui passe, les
      basses. Au-dessus de la fréquence de coupure, les aigus sont retirés et
      le son devient plus sourd.
  - question: "Pourquoi le pad passe-t-il de `sine` à `sawtooth` dans cette partie ?"
    options:
      [
        "Une sinusoïde ne contient que la fréquence de sa note : un passe-bas n'a rien à y retirer",
        "Parce que `sine` ne fonctionne pas avec les accords",
        "Parce que `sawtooth` est plus doux que `sine`",
        "Pour changer les notes du pad",
      ]
    answer: 0
    explanation: >-
      Un filtre ne retire que ce qui existe. La dent de scie contient beaucoup
      de fréquences aiguës : le passe-bas peut les retirer, c'est la synthèse
      soustractive.
  - question: "Pourquoi poser un passe-haut sur les charlestons ?"
    options:
      [
        "Pour leur retirer les graves qui pourraient gêner la grosse caisse et le sub",
        "Pour les rendre plus graves",
        "Pour qu'ils jouent plus vite",
        "Pour qu'ils sonnent comme une caisse claire",
      ]
    answer: 0
    explanation: >-
      Le passe-haut laisse passer les aigus et retire les graves. Sur un
      charleston, il nettoie la zone grave pour la laisser à la grosse caisse et
      au sub.
  - question: "Le passe-haut de 4500 Hz s'entend à peine sur les charlestons de la 808. Pourquoi ?"
    options:
      [
        "Ils n'ont presque pas d'énergie sous 4500 Hz : il n'y a presque rien à retirer",
        "Le passe-haut ne fonctionne pas sur les sons enregistrés",
        "Il faut réévaluer deux fois pour qu'un filtre agisse",
        "4500 Hz est une fréquence que l'oreille n'entend pas",
      ]
    answer: 0
    explanation: >-
      Les charlestons de la TR-808 ont presque toute leur énergie au-dessus de
      6000 Hz. Le filtre retire le peu qui reste en
      dessous ; il ne s'entend qu'en montant beaucoup plus haut.
---
