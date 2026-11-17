---
part: "reprendre-la-rythmique"
questions:
  - question: "Pourquoi vérifier la rythmique avant d'y ajouter une mélodie et des accords ?"
    options:
      [
        "Parce qu'une erreur s'entend facilement sur une piste seule, et beaucoup moins sous plusieurs couches",
        "Parce que Strudel refuse d'ajouter des notes à une rythmique qui contient une erreur",
        "Parce que la mélodie corrige automatiquement les erreurs de la rythmique",
        "Parce qu'une rythmique ne peut plus être modifiée une fois la mélodie ajoutée",
      ]
    answer: 0
    explanation: >-
      Chaque couche ajoutée masque un peu les autres. Une caisse claire mal
      placée, évidente sur la batterie seule, se perd sous un pad et une
      mélodie : on corrige la fondation tant qu'elle est encore simple.
  - question: "Que fait `//` placé au début d'une ligne du `stack()` ?"
    options:
      [
        "Strudel ignore cette ligne : la piste se tait, sans être effacée",
        "La piste joue deux fois moins fort",
        "La piste joue deux fois plus lentement",
        "Strudel affiche une erreur tant que la ligne n'est pas supprimée",
      ]
    answer: 0
    explanation: >-
      Une ligne commentée n'est plus du code pour Strudel. Après réévaluation,
      la piste se tait ; il suffit de retirer les `//` et de réévaluer pour
      la retrouver telle quelle.
  - question: "Vous commentez la dernière piste du `stack()`. La ligne juste au-dessus se termine par une virgule. Que faut-il faire ?"
    options:
      [
        "Rien : Strudel accepte une virgule après la dernière piste",
        "Retirer la virgule, sinon Strudel affiche une erreur",
        "Commenter aussi la ligne du dessus",
        "Remplacer la virgule par un point-virgule",
      ]
    answer: 0
    explanation: >-
      Une virgule après la dernière piste est permise. C'est ce qui permet de
      commenter n'importe quelle ligne du `stack()`, puis de la rétablir, sans
      jamais retoucher les autres.
  - question: "Le motif tourne à 128 BPM. Vous commentez la ligne `setcpm(128 / 4)` et réévaluez. À quelle vitesse joue-t-il ?"
    options:
      [
        "Toujours 128 BPM : le bloc garde le dernier tempo réglé",
        "120 BPM, la vitesse par défaut de Strudel",
        "Il s'arrête : `setcpm()` est obligatoire",
        "Strudel affiche une erreur",
      ]
    answer: 0
    explanation: >-
      Une ligne commentée ne s'exécute plus, mais elle ne défait pas ce
      qu'elle avait réglé. Le tempo reste celui du dernier `setcpm()`, jusqu'au
      rechargement de la page. Pour revenir à 120 BPM, on écrit
      `setcpm(120 / 4)`.
---
