---
part: "strudel-une-facade"
questions:
  - question: "Que rend `pattern.queryArc(0, 1)` ?"
    options:
      - "Un fichier audio du premier cycle."
      - "La liste des événements (`Hap`) actifs sur cet intervalle, sans produire aucun son."
      - "Le nombre de notes du motif."
      - "Une promesse résolue quand le cycle a fini de jouer."
    answer: 1
    explanation: >-
      Un motif ne contient pas de notes : c'est une fonction pure à qui on
      demande ce qui se passe entre deux instants. L'appeler ne joue rien et ne
      modifie rien — deux appels identiques rendent le même résultat. C'est ce
      qui le rend testable sans carte son ni navigateur.
  - question: "Pourquoi `TimeSpan` manipule-t-il des `Fraction` plutôt que des nombres JavaScript ?"
    options:
      - "Pour économiser de la mémoire."
      - "Parce que les rythmes sont des divisions exactes, et que l'erreur des flottants s'accumulerait au fil des boucles."
      - "Parce que la Web Audio API exige des fractions."
      - "Pour pouvoir afficher les durées sous forme de fractions à l'écran."
    answer: 1
    explanation: >-
      `0.1 + 0.2 !== 0.3` et `1/3 + 1/3 + 1/3 !== 1`. Sur un cycle isolé l'erreur
      est invisible ; sur dix minutes de boucle, le rythme dérive. Strudel garde
      la représentation exacte et ne convertit en secondes qu'au dernier moment,
      au bord du système.
  - question: "Où passe exactement la frontière entre le cœur pur et le monde sonore ?"
    options:
      - "Dans `@strudel/mini`, quand la chaîne est analysée."
      - "Dans le `Cyclist`, à la division par `cps` qui convertit des cycles en secondes."
      - "Dans le navigateur, au moment du clic."
      - "Dans `@strudel/core`, qui ouvre l'`AudioContext`."
    answer: 1
    explanation: >-
      À gauche de cette ligne, des cycles — l'unité de `@strudel/core`. À droite,
      des secondes de l'horloge de l'`AudioContext`. Après elle, il n'y a plus de
      motif : seulement « ce son, à cet instant ». `@strudel/core` ne crée jamais
      de nœud audio ; il ne dépend que de `fraction.js`.
---
