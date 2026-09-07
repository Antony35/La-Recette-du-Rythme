---
part: "la-web-audio-api"
questions:
  - question: "Comment produit-on un son avec la Web Audio API ?"
    options:
      - "En appelant une fonction du type `jouerUnSon(fichier)`."
      - "En construisant un graphe de nœuds reliés jusqu'à `ctx.destination`."
      - "En écrivant les échantillons un par un dans un tableau."
      - "En déclarant une balise `<audio>` dans le HTML."
    answer: 1
    explanation: >-
      On relie des nœuds : une source, des traitements, puis la destination.
      C'est le modèle de flot de données de Max/MSP, arrivé dans le navigateur —
      et il a survécu à trente ans de changements de plateforme parce que c'est
      la bonne façon de représenter un traitement de signal.
  - question: "Quelle est la différence essentielle entre `ctx.currentTime` et `Date.now()` ?"
    options:
      - "`ctx.currentTime` est en millisecondes, `Date.now()` en secondes."
      - "`ctx.currentTime` est plus rapide à lire."
      - "`ctx.currentTime` avance dans le thread audio, cadencé par la carte son, indépendamment de la charge du thread principal."
      - "Il n'y en a pas : ce sont deux noms pour la même horloge."
    answer: 2
    explanation: >-
      C'est le point central de la partie. L'horloge audio n'est pas perturbée
      quand le JavaScript bloque, et sa précision utile est de l'ordre de
      l'échantillon. C'est elle qu'on utilise pour programmer un son dans le
      futur avec `source.start(ctx.currentTime + 0.5)`.
  - question: "Un `AudioContext` créé au chargement de la page reste muet. Pourquoi ?"
    options:
      - "Le fichier son n'est pas encore téléchargé."
      - "Les navigateurs interdisent de démarrer l'audio sans geste de l'utilisateur : le contexte naît `suspended`."
      - "Il faut d'abord appeler `createGain()`."
      - "Le volume est à zéro par défaut."
    answer: 1
    explanation: >-
      Et surtout : aucune erreur n'est levée. Le code s'exécute normalement, il
      ne se passe simplement rien. C'est pour ça qu'il faut un bouton — pas par
      choix d'interface, mais par contrainte de la plateforme. `ctx.resume()`
      dans un gestionnaire de clic débloque la situation.
---
