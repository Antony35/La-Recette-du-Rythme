---
part: "le-repl"
questions:
  - question: "Dans Strudel, à quoi correspondent les quatre étapes du REPL ?"
    options:
      [
        "Lire le code, l'évaluer, jouer le résultat, puis recommencer avec une nouvelle version",
        "Enregistrer un son, l'éditer, l'exporter, puis le publier",
        "Lancer la lecture, l'arrêter, effacer le code, puis tout réécrire",
        "Lire une partition, la jouer, l'enregistrer, puis l'écouter",
      ]
    answer: 0
    explanation: >-
      Read, Evaluate, Print, Loop : lire, évaluer, afficher, recommencer. En
      musique, afficher devient jouer. La dernière étape est la vôtre : vous
      modifiez le code et relancez la boucle.
  - question: "Pendant la lecture, vous passez de `s(\"bd*4\")` à `s(\"bd*8\")` puis réévaluez. Qu'entendez-vous ?"
    options:
      [
        "Huit coups dans un cycle de même durée : ils sont deux fois plus rapprochés",
        "Huit coups au même rythme qu'avant : le cycle dure deux fois plus longtemps",
        "Quatre coups, mais deux fois plus aigus",
        "Un silence, le temps que Strudel recharge le motif",
      ]
    answer: 0
    explanation: >-
      Le cycle garde sa durée. `*8` y place huit coups au lieu de quatre : le
      rythme devient plus dense, et le son de grosse caisse ne change pas.
  - question: "Que désigne `bd` dans `s(\"bd*4\")` ?"
    options:
      [
        "La grosse caisse, bass drum en anglais",
        "La ligne de basse du morceau",
        "Le nombre de battements par minute",
        "Une banque de sons à télécharger",
      ]
    answer: 0
    explanation: >-
      `s(...)` choisit le son à jouer, et `bd` est le code de la grosse caisse.
      Les autres pièces de la batterie ont aussi leur code à deux lettres : ce
      sera l'objet de la partie suivante.
  - question: "Comment faire entendre une modification sans arrêter la musique ?"
    options:
      [
        "Cliquer dans l'éditeur puis appuyer sur Ctrl + Entrée",
        "Appuyer sur Stop, puis sur Play",
        "Recharger la page avec F5",
        "Appuyer sur Entrée à la fin de la ligne",
      ]
    answer: 0
    explanation: >-
      Ctrl + Entrée réévalue le code pendant que la version précédente joue
      encore. Stop puis Play fonctionne aussi, mais coupe le son. Entrée seule
      ajoute une ligne, et recharger la page efface vos modifications.
---
