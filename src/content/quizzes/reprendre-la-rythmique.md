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
  - question: "Pendant la lecture, un nom de son s'encadre, mais vous ne l'entendez pas. Que vérifier en premier ?"
    options:
      [
        "L'orthographe du nom : Strudel encadre aussi un son qu'il ne trouve pas",
        "Le nombre de virgules du `stack()`",
        "Le volume de la grosse caisse",
        "Que la ligne n'est pas commentée",
      ]
    answer: 0
    explanation: >-
      Le surlignage montre ce que le code demande, pas ce qui sonne. Un nom
      inconnu s'encadre comme les autres, sans son ni message : c'est presque
      toujours une faute de frappe. Une ligne commentée, elle, ne s'encadre plus.
  - question: "Pourquoi un charleston plus léger (`hh*4` plutôt que `hh*16`) peut-il aider pour la suite ?"
    options:
      [
        "Il laisse plus de place à la mélodie qui va venir dans l'aigu",
        "Il accélère le tempo du morceau",
        "Il est obligatoire pour ajouter un pad",
        "Il évite une erreur de syntaxe dans le `stack()`",
      ]
    answer: 0
    explanation: >-
      Le charleston occupe l'aigu, là où jouera la mélodie. Plus il est
      chargé, plus il entre en concurrence avec elle. Alléger une couche,
      c'est préparer la place des suivantes.
---
