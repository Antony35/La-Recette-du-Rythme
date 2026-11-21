---
part: "enveloppe-sustain-release"
questions:
  - question: "Que règle `.sustain(0.7)` ?"
    options:
      [
        "Un niveau : le son reste à 70 % de son maximum tant que la note dure",
        "Une durée : la note tient 0,7 seconde",
        "Le temps que met le son à s'éteindre après la note",
        "Le temps de montée du son",
      ]
    answer: 0
    explanation: >-
      Le sustain est le seul réglage de l'enveloppe qui n'est pas une durée.
      C'est un niveau, entre 0 et 1, maintenu jusqu'à la fin de la note.
  - question: "Que se passe-t-il avec un `release` long sur le pad ?"
    options:
      [
        "Chaque accord continue de sonner après sa fin et se mêle au suivant",
        "L'accord démarre plus lentement",
        "Le pad joue plus fort",
        "L'accord est coupé net à sa fin",
      ]
    answer: 0
    explanation: >-
      Le release commence quand la note s'arrête. S'il est long, l'accord qui
      se termine résonne encore pendant que le suivant monte : c'est ce qui
      fait une nappe.
  - question: "Vous écrivez `.decay(0.3)` sans `.sustain()`. Qu'entend-on ?"
    options:
      [
        "Le son s'éteint après 0,3 seconde : Strudel met alors le sustain à zéro",
        "Le son tient à 60 % jusqu'à la fin de la note",
        "Strudel signale une erreur, le sustain est obligatoire",
        "Le decay est ignoré",
      ]
    answer: 0
    explanation: >-
      Quand un decay est écrit seul, Strudel fait redescendre le son jusqu'au
      silence. Pour garder une tenue, écrivez le sustain avec le decay.
  - question: "Que peut faire une enveloppe sur un son enregistré comme `bd` ?"
    options:
      [
        "Le raccourcir, mais pas le rallonger au-delà de l'enregistrement",
        "Le rallonger autant qu'on veut avec un sustain à 1",
        "Rien : l'enveloppe ne s'applique qu'aux synthés",
        "Changer sa hauteur",
      ]
    answer: 0
    explanation: >-
      L'enveloppe module le volume de ce qui existe. Un enregistrement qui
      s'arrête de lui-même ne peut pas être prolongé : on peut seulement le
      couper plus tôt pour le rendre plus sec.
---
