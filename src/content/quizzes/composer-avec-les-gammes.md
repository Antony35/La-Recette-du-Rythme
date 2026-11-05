---
part: "composer-avec-les-gammes"
questions:
  - question: "Pourquoi écrire une mélodie avec `n(\"…\").scale(\"A:minor\")` plutôt qu'avec des noms de notes ?"
    options:
      [
        "Toutes les notes restent dans la gamme : aucune ne peut sonner faux",
        "C'est la seule façon de jouer plusieurs notes dans un cycle",
        "Les numéros jouent plus fort que les noms de notes",
        "Strudel ne connaît pas les noms de notes en dehors d'une gamme",
      ]
    answer: 0
    explanation: >-
      `.scale()` transforme chaque numéro en une note de la gamme choisie. On
      peut changer les numéros au hasard : le résultat reste dans la gamme, donc
      sans fausse note.
  - question: "Avec `.scale(\"A:minor\")`, que joue `n(\"7\")` ?"
    options:
      [
        "La note de départ, la, une octave plus haut",
        "La septième note de la gamme, sol",
        "Rien : une gamme n'a que sept notes, de 0 à 6",
        "La note la plus grave de la gamme",
      ]
    answer: 0
    explanation: >-
      Les numéros commencent à 0. Une gamme a sept notes, de 0 à 6 : le
      numéro 7 recommence au la, une octave au-dessus.
  - question: "Que fait un numéro négatif, comme `n(\"-1\")` ?"
    options:
      [
        "Il joue une note de la gamme sous la note de départ",
        "Il joue un silence",
        "Il provoque une erreur",
        "Il joue la note de départ plus doucement",
      ]
    answer: 0
    explanation: >-
      Les numéros négatifs descendent sous la tonique. Avec la gamme de la
      mineur, `-1` joue le sol juste en dessous du la.
  - question: "Vous remplacez `\"A4:minor\"` par `\"A4:major\"` sans toucher aux numéros. Que se passe-t-il ?"
    options:
      [
        "La mélodie garde sa forme, mais sonne plus lumineuse",
        "La mélodie joue une octave plus haut",
        "Strudel affiche une erreur : les numéros ne correspondent plus",
        "Rien ne change, `major` et `minor` sont équivalents",
      ]
    answer: 0
    explanation: >-
      Les numéros désignent des marches de la gamme. En changeant de gamme, on
      garde les mêmes marches mais avec d'autres notes : la mélodie monte et
      descend aux mêmes endroits, avec une couleur différente.
---
