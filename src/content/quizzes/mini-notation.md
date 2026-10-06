---
part: "mini-notation"
questions:
  - question: "Quelle différence entre `s(\"bd hh hh sd\")` et `s(\"bd hh*2 sd\")` ?"
    options:
      [
        "Le premier a quatre cases, le second trois — les deux charlestons du second tiennent dans une seule",
        "Aucune : les deux jouent deux charlestons",
        "Le second joue les charlestons deux fois plus fort",
        "Le second dure deux fois plus longtemps",
      ]
    answer: 0
    explanation: >-
      L'espace **ajoute une case**, `*` **remplit une case**. Dans le premier
      motif, chaque son occupe un quart de cycle. Dans le second, la caisse
      claire arrive au dernier tiers, pas au dernier quart : les coups ne tombent
      pas du tout aux mêmes endroits.
  - question: "Que fait `~` ?"
    options:
      [
        "Il occupe une case sans rien jouer : un événement silencieux, qui prend sa part du cycle",
        "Il supprime la case, donc le cycle se redivise entre les sons restants",
        "Il met en pause la lecture jusqu'au cycle suivant",
        "Il répète le son précédent en plus doux",
      ]
    answer: 0
    explanation: >-
      C'est ce qui distingue `s("bd ~ sd ~")` de `s("bd sd")` : les deux font
      sonner les mêmes coups aux mêmes instants, mais le premier garde quatre
      cases, donc de la place pour y poser autre chose. Le silence est une place
      réservée.
  - question: "Vous ajoutez un son dans un motif. Que devient la durée du cycle ?"
    options:
      [
        "Elle ne change pas : les événements se partagent simplement un gâteau plus finement découpé",
        "Elle augmente, pour laisser la place au nouveau son",
        "Elle augmente, mais seulement si le motif dépasse quatre événements",
        "Elle diminue, car le tempo s'accélère",
      ]
    answer: 0
    explanation: >-
      Le cycle est la durée de référence et ne dépend d'aucun contenu. Toute la
      mini-notation ne répond qu'à une question : comment se partager ce temps
      fixe.
  - question: "Votre motif ne produit plus aucun son, et Strudel n'affiche aucun message. Que cherchez-vous en premier ?"
    options:
      [
        "Une faute d'orthographe dans un nom de son",
        "Un crochet ou une parenthèse non refermés",
        "Un `*` dont le nombre serait trop grand",
        "Un problème de volume du navigateur",
      ]
    answer: 0
    explanation: >-
      Si Strudel se plaint, c'est la syntaxe : il n'a pas pu lire le motif et le
      dit. S'il se tait, c'est l'orthographe : le motif est valide, mais le son
      demandé n'existe pas, donc il laisse un blanc. Le message n'apparaît alors
      que dans la console du navigateur.
---
