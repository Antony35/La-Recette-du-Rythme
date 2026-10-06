---
part: "changer-de-drum-kit"
questions:
  - question: "Que fait réellement `.bank(\"RolandTR909\")` ?"
    options:
      [
        "Il colle le nom de la machine devant celui du son : `bd` devient `RolandTR909_bd`",
        "Il applique un filtre qui vieillit le son",
        "Il change le tempo pour celui de la machine d'origine",
        "Il remplace le motif par un motif d'usine de la machine",
      ]
    answer: 0
    explanation: >-
      C'est une convention de nommage, rien de plus. Savoir ça explique le piège
      de la partie : si l'échantillon `RolandTR909_rim` n'existe pas, le son
      disparaît sans message.
  - question: "Vous ajoutez `.bank()` et un de vos sons disparaît. Que cherchez-vous ?"
    options:
      [
        "Si cette banque contient bien ce son : toutes les machines n'ont pas tous les sons",
        "Une erreur de syntaxe dans la mini-notation",
        "Un `~` que vous auriez ajouté par erreur",
        "Un problème de volume sur cette fréquence",
      ]
    answer: 0
    explanation: >-
      Le motif n'a pas changé, donc la mini-notation n'est pas en cause. Il
      manque simplement l'échantillon demandé dans cette banque — l'erreur est
      dans le nom du kit, pas dans le rythme.
  - question: "Pourquoi le choix du kit change-t-il le genre du morceau ?"
    options:
      [
        "Parce que `bd` désigne une place, pas un son : l'échantillon derrière vient d'une machine au caractère très marqué",
        "Parce que chaque banque impose son propre tempo",
        "Parce que les banques récentes ont plus de sons que les anciennes",
        "Parce que `.bank()` modifie aussi la mini-notation",
      ]
    answer: 0
    explanation: >-
      Une grosse caisse de TR-808 est longue et ronde, celle d'une TR-909 courte
      et claquante. Le code est identique, la musique non — c'est la leçon de
      cette partie.
---
