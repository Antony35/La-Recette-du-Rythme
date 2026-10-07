---
part: "une-gamme-complete"
questions:
  - question: "Vous passez de `note(\"c d e f g a b\")` à `note(\"c d e\")`. Qu'est-ce qui change ?"
    options:
      [
        "Les trois notes durent plus longtemps : le cycle garde la même durée et se partage entre moins d'événements",
        "Le motif devient plus court et le cycle suivant démarre plus tôt",
        "Les trois notes gardent leur durée et un silence remplit la fin du cycle",
        "Le tempo accélère pour compenser",
      ]
    answer: 0
    explanation: >-
      Le cycle est la durée de référence : il ne dépend pas du nombre de notes.
      Trois notes se partagent donc le même temps que sept, et durent chacune
      plus longtemps. C'est le principe qui expliquera `*` et `~` en séquence 2.
  - question: "À quoi sert le `4` de `c4` ?"
    options:
      [
        "À dire dans quelle octave jouer la note, donc à quelle hauteur",
        "À jouer la note quatre fois",
        "À régler le volume de la note",
        "À placer la note au quatrième temps du cycle",
      ]
    answer: 0
    explanation: >-
      Le nom donne la note, le chiffre donne l'octave. `c3` et `c4` sont le même
      « do », à deux hauteurs différentes — c'est ce qui permet à une gamme de
      « se refermer » au lieu de s'arrêter en chemin.
  - question: "Sur le piano roll, que lit-on sur l'axe vertical ?"
    options:
      [
        "La hauteur de la note : plus le rectangle est haut, plus la note est aiguë",
        "Le volume de la note",
        "La durée de la note",
        "Le numéro de la piste"
      ]
    answer: 0
    explanation: >-
      Horizontalement le temps, verticalement la hauteur. Une gamme dessine donc
      un escalier régulier, et une mélodie des allers-retours. C'est le repère
      qui sert à voir d'un coup d'œil si un motif fait bien ce qu'on croit.
  - question: "`note(\"cdefgab\")` ne produit aucun son. Pourquoi ?"
    options:
      [
        "Sans espaces, Strudel y voit le nom d'une seule note, qu'il ne connaît pas",
        "Il manque les numéros d'octave, obligatoires",
        "Une suite de notes doit tenir dans quatre temps au maximum",
        "`note()` n'accepte que des majuscules",
      ]
    answer: 0
    explanation: >-
      L'espace est le séparateur : c'est lui qui découpe la suite en événements.
      Sans lui, il n'y a qu'un seul nom, introuvable — et Strudel se tait sans
      afficher d'erreur, comme pour un code de batterie mal orthographié.
---
