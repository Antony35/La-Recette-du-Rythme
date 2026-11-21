---
title: "Sound design — ADSR (Attack, Decay, Sustain, Release), filtres et effets"
objective: "Sculpter le son de sa musique avec l'enveloppe complète, les filtres LPF (Low-Pass Filter : filtre passe-bas) et HPF (High-Pass Filter : filtre passe-haut) et les effets (reverb, phaser…)"
order: 4
level: 2
durationMinutes: 120
equipment: ["Éditeur Strudel"]
---

<details>
  <summary>Aide-mémoire : tous les réglages de la séquence</summary>

Chaque réglage s'écrit comme une méthode, à la suite du son : `.attack(0.005)`.
Les repères sont des points de départ, pas des réponses : réglez toujours à
l'oreille.

**Enveloppe** (4.1 et 4.2)

| Réglage | Ce qu'il fait | Repères |
|---|---|---|
| `attack` | temps de montée du son, en secondes | `0.005` claque, `0.5` gonfle |
| `decay` | temps de redescente jusqu'au sustain | `0.1` « tic », `1` résonne |
| `sustain` | niveau tenu, de `0` à `1` : pas un temps | `0` percussif, `0.7` nappe |
| `release` | temps d'extinction après la note | `0.1` net, `0.8` se fond |

**Filtres** (4.3 et 4.4)

| Réglage | Ce qu'il fait | Repères |
|---|---|---|
| `lpf` | passe-bas : coupe les aigus au-dessus, en Hz | pad : `700` à `1500` |
| `hpf` | passe-haut : coupe les graves en dessous | charlestons : `3000` à `6000` |
| `lpq`, `hpq` | résonance du filtre, de `0` à `50` | `2` à `6` musical, `12` siffle |

**Effets d'espace** (4.5)

| Réglage | Ce qu'il fait | Repères |
|---|---|---|
| `room` | quantité de reverb, de `0` à `1` | `0.2` à `0.45` |
| `delay` | volume de l'écho, de `0` à `1` | `0.15` à `0.35` |
| `delaytime` | temps entre deux échos, en secondes | `60 / 128 / 2` : un demi-temps |
| `delayfeedback` | part de l'écho renvoyée dans le suivant | `0.25`, **jamais `1`** |
| `orbit` | circuit d'effets d'une couche | une orbite par couche |

**Écritures** (4.1, 4.2 et 4.6)

| Écriture | Ce qu'elle fait |
|---|---|
| `slider(v, min, max)` | curseur dans le code : valeur de départ, minimum, maximum |
| `.fast(2)`, `.slow(2)` | joue le motif deux fois plus vite, ou plus lentement |
| `@4` | durée relative : `@4` dure quatre fois `@1` |
| `bd:1` | enregistrement n° 1 d'un son ; `bd` joue le n° 0 |
| `nom:` | bloc nommé, joué avec les autres ; `_nom:` le coupe |

</details>
