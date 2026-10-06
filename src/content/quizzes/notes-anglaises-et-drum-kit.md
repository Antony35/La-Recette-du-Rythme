---
part: "notes-anglaises-et-drum-kit"
questions:
  - question: "Vous voulez faire jouer un « la ». Qu'écrivez-vous dans `note(\"…\")` ?"
    options: ["`a`", "`l`", "`la`", "`A6`"]
    answer: 0
    explanation: >-
      En notation anglaise, « la » s'écrit `A`, et Strudel attend des minuscules.
      Le point d'ancrage à retenir est celui-là : A = la. Le reste se déduit en
      remontant l'alphabet.
  - question: "Que désigne `sd` ?"
    options:
      ["La caisse claire", "La grosse caisse", "Le charleston", "Un silence"]
    answer: 0
    explanation: >-
      `sd` abrège *snare drum*, la caisse claire. La grosse caisse est `bd`
      (*bass drum*) et le charleston `hh` (*hihat*).
  - question: "Pourquoi `hh` et `oh` existent-ils tous les deux ?"
    options:
      [
        "C'est le même instrument joué de deux façons : charleston fermé ou ouvert",
        "Ce sont deux cymbales différentes, posées à deux endroits du kit",
        "`oh` est l'ancienne écriture de `hh`, conservée par compatibilité",
        "`oh` est la version plus forte de `hh`",
      ]
    answer: 0
    explanation: >-
      Le charleston est une paire de cymbales serrées par une pédale. Pédale
      enfoncée, le son est sec (`hh`) ; relâchée, il continue de vibrer (`oh`).
      Même logique pour `sd` et `rim`, qui sont le même fût frappé sur la peau ou
      sur le cercle. Un code ne nomme pas une pièce, il nomme un son.
  - question: "Vous tapez `s(\"bd sdd hh\")` et vous n'entendez que deux sons sur trois. Pourquoi ?"
    options:
      [
        "`sdd` n'existe pas : Strudel ne trouve aucun son et reste silencieux à cet endroit",
        "Trois sons à la suite, c'est trop pour un seul cycle",
        "Il manque une virgule entre les sons",
        "`bd` et `hh` couvrent le son de `sdd`",
      ]
    answer: 0
    explanation: >-
      C'est le piège le plus coûteux du débutant : un code mal orthographié ne
      déclenche **aucune erreur**. Strudel cherche un son nommé `sdd`, ne le
      trouve pas, et laisse simplement un blanc. Devant un silence inattendu, la
      première chose à vérifier est l'orthographe.
---
