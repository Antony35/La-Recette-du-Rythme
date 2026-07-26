import { describe, expect, test } from "vitest";

// import { buildCourse, flattenCourse, getNeighbours } from "./course";

/**
 * Les fonctions testées ici sont volontairement pures : elles reçoivent les
 * séquences et les parties en arguments plutôt que d'appeler getCollection().
 * Aucun import d'`astro:content` ne doit apparaître dans ce fichier.
 *
 * TODO : fabriquer les fixtures.
 *   Une séquence a la forme  { id, data: { title, objective } }
 *   Une partie a la forme    { id, data: { title, order, durationMinutes,
 *                                          sequence: { collection, id } } }
 *   Un petit helper (ex. `sequence("01")` / `part("a", "01", 1)`) évitera de
 *   réécrire ces objets à chaque test.
 */
const sequence = {
	id: "01",
	data: {
		title: "sequence 1",
		objective: "objectif de la sequence 1",
	},
};

const part = {
	id: "01",
	data: {
		title: "partie 1",
		order: 1,
		durationMinutes: 15,
	},
};

describe("buildCourse — construction de l'arbre", () => {
	// TODO : les séquences ressortent triées par `id`
	//   Depuis la suppression de `numero`, l'ordre des séquences vient du nom de
	//   fichier (01, 02, …). Donne-les en entrée dans le désordre et vérifie la sortie.
	test.todo("trie les séquences par id");

	// TODO : dans chaque séquence, les parties sont triées par `order`
	test.todo("trie les parties de chaque séquence par order");

	// TODO : chaque partie est rattachée à la bonne séquence
	//   Le rattachement se fait sur `part.data.sequence.id`, pas sur l'objet.
	test.todo("rattache chaque partie à sa séquence");

	// TODO : une séquence sans aucune partie doit quand même apparaître,
	//   avec un tableau `parts` vide (et non `undefined`).
	test.todo("conserve une séquence sans partie, avec parts: []");
});

describe("flattenCourse — liste plate ordonnée", () => {
	// TODO : l'aplatissement suit l'ordre de lecture du cours :
	//   toutes les parties de S1 dans l'ordre, puis celles de S2, etc.
	test.todo("respecte l'ordre séquence puis order");

	// TODO : une séquence vide ne produit rien — elle disparaît naturellement
	//   de la liste plate, sans condition particulière.
	test.todo("ignore les séquences sans partie");

	// TODO : aucune partie n'est perdue ni dupliquée.
	//   Comparer la longueur de la liste plate au nombre de parties en entrée.
	test.todo("contient toutes les parties, une seule fois");
});

describe("getNeighbours — navigation globale", () => {
	// TODO : au milieu du cours, previous et next sont les parties adjacentes.
	test.todo("renvoie les parties adjacentes au milieu d'une séquence");

	// TODO : le cas qui justifie la liste plate — la partie suivant la dernière
	//   de S1 est la première de S2, pas `undefined`.
	test.todo("franchit la frontière entre deux séquences");

	// TODO : la toute première partie du cours n'a pas de précédent.
	test.todo("renvoie previous: undefined pour la première partie du cours");

	// TODO : la toute dernière partie du cours n'a pas de suivant.
	test.todo("renvoie next: undefined pour la dernière partie du cours");

	// TODO : une séquence vide entre deux séquences pleines est enjambée,
	//   sans traitement particulier dans le code.
	test.todo("enjambe une séquence vide");

	// TODO : cas défensif — un identifiant inconnu.
	//   Décide du comportement attendu (undefined des deux côtés ? erreur ?)
	//   et fige-le ici : c'est une décision de conception, pas un détail.
	test.todo("gère un identifiant de partie inconnu");
});

// Garde-fou : à supprimer dès que le premier vrai test est écrit.
test("le fichier de tests est bien pris en compte", () => {
	expect(true).toBe(true);
});
