---
part: "histoire-vst-max-for-live"
questions:
  - question: "Qu'est-ce que le format VST a changé, en 1996 ?"
    options:
      - "Il a permis d'enregistrer plusieurs pistes en même temps."
      - "Il a fait de l'instrument un logiciel que n'importe qui peut écrire et compiler."
      - "Il a introduit le live coding sur scène."
      - "Il a remplacé les cartes son matérielles."
    answer: 1
    explanation: >-
      Le VST n'a pas changé le son, il a changé qui fabrique l'instrument. Avant,
      un synthétiseur était un objet vendu par un fabricant ; après, c'est du C++
      compilable par une communauté de développeurs. La limite restait qu'il
      fallait recompiler pour modifier le comportement.
  - question: "Quel apport de Max/MSP le VST ne permettait pas ?"
    options:
      - "Produire un son de meilleure qualité."
      - "Charger des greffons dans un logiciel hôte."
      - "Modifier l'instrument pendant qu'on en joue, sans recompiler."
      - "Enregistrer le résultat dans un fichier."
    answer: 2
    explanation: >-
      C'est le point de bascule : avec Max, la frontière entre « écrire le
      programme » et « s'en servir » s'efface. Le musicien rebranche ses câbles
      en direct. Max for Live (2009) a poussé l'idée jusqu'à rendre un
      instrument d'Ableton ouvrable et modifiable.
  - question: "Qu'est-ce que TidalCycles apporte, et que Strudel hérite directement ?"
    options:
      - "Un moteur de synthèse écrit en Haskell."
      - "La séparation entre décrire le temps et produire le son."
      - "Une bibliothèque d'échantillons de batterie."
      - "Un format de fichier pour échanger des morceaux."
    answer: 1
    explanation: >-
      TidalCycles n'invente aucun moteur audio : il décrit des motifs et les
      envoie à SuperCollider, qui fait le son. C'est exactement l'architecture
      que Strudel reprend, en remplaçant SuperCollider par la Web Audio API du
      navigateur.
---
