---
part: "le-temps-reel-en-javascript"
questions:
  - question: "Pourquoi `setInterval(jouer, 250)` donne-t-il un rythme qui flotte ?"
    options:
      - "Parce que 250 ms n'est pas un multiple de la fréquence d'échantillonnage."
      - "Parce que `setInterval` garantit *au moins* 250 ms, jamais exactement, et que les retards s'accumulent sur un thread principal partagé."
      - "Parce que le navigateur limite le nombre de minuteurs."
      - "Parce qu'il faudrait utiliser `setTimeout` à la place."
    answer: 1
    explanation: >-
      Un rendu, un ramasse-miettes, un autre minuteur en attente, et le rappel
      arrive en retard — puis ce retard repousse le suivant. L'oreille perçoit un
      décalage rythmique dès une dizaine de millisecondes, bien avant qu'on ne
      voie une saccade à l'écran.
  - question: "En quoi consiste le motif des « deux horloges » ?"
    options:
      - "Comparer deux horloges pour corriger la dérive de la première."
      - "Utiliser une horloge pour le tempo et une autre pour les effets."
      - "Un minuteur JavaScript grossier se réveille régulièrement et programme, à l'horloge audio précise, tout ce qui doit tomber dans une fenêtre à venir."
      - "Lancer deux `setInterval` décalés pour doubler la précision."
    answer: 2
    explanation: >-
      On arrête d'essayer d'être ponctuel. Le JavaScript n'a plus qu'à se
      réveiller *avant* l'échéance, ce qui est bien plus facile à garantir. Dans
      `zyklus.mjs` : réveil toutes les 100 ms, fenêtre d'anticipation de 200 ms
      grâce au `overlap`, qui sert de marge si un réveil est en retard.
  - question: "Pourquoi le `Cyclist` ajoute-t-il volontairement `latency = 0.1` à chaque déclenchement ?"
    options:
      - "Pour compenser le temps de téléchargement des échantillons."
      - "Parce que la Web Audio API refuse de programmer un son dans les 100 ms."
      - "Pour se synchroniser avec l'affichage."
      - "Parce qu'un retard constant absorbe les irrégularités du thread principal : mieux vaut un décalage stable qu'un timing variable."
    answer: 3
    explanation: >-
      C'est un arbitrage classique du temps réel, qu'on retrouve dans les jeux en
      réseau et le streaming : on achète de la robustesse avec de la latence.
      Sans ce coussin, la moindre hésitation du JavaScript s'entendrait
      immédiatement.
  - question: "Avec `cps = 0.5` par défaut, combien de frappes par seconde produit `s(\"bd*4\")` ?"
    options:
      - "Quatre : `*4` signifie quatre par seconde."
      - "Deux : un cycle dure 2 secondes et contient quatre frappes."
      - "Huit."
      - "Cela dépend du tempo du navigateur."
    answer: 1
    explanation: >-
      `cps` compte les cycles par seconde : 0,5 cycle par seconde, donc un cycle
      de 2 secondes. `*4` place quatre frappes *par cycle*, soit deux par
      seconde. Le motif est décrit en fractions de cycle, jamais en secondes —
      c'est pourquoi changer `cps` accélère tout sans déformer les rapports.
---
