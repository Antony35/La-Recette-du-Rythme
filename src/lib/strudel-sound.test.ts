import { describe, expect, it, vi } from "vitest";
import {
	createPlayer,
	DEFAULT_DURATION,
	LEAD_TIME,
	loadDrumKit,
	type SoundEngine,
} from "@/lib/strudel-sound";

/** Un moteur factice : on vérifie la logique, pas le son. */
const fakeEngine = () => {
	const triggered: { value: unknown; time: number; duration: number }[] = [];

	const engine: SoundEngine = {
		now: () => 10,
		trigger: (value, time, duration) => {
			triggered.push({ value, time, duration });
		},
	};

	return { engine, triggered };
};

describe("createPlayer", () => {
	it("ne charge rien tant que personne n'a joué", () => {
		const load = vi.fn();
		const player = createPlayer(load);

		expect(load).not.toHaveBeenCalled();
		expect(player.started).toBe(false);
	});

	// L'intérêt de mémoriser la *promesse* et non le moteur : sans ça, deux
	// clics rapprochés téléchargeraient Strudel deux fois et créeraient deux
	// AudioContext concurrents.
	it("ne charge qu'une fois, même sur des appels simultanés", async () => {
		const { engine } = fakeEngine();
		const load = vi.fn(async () => engine);
		const player = createPlayer(load);

		await Promise.all([
			player.play({ s: "bd" }),
			player.play({ s: "sd" }),
			player.play({ s: "hh" }),
		]);
		await player.play({ s: "oh" });

		expect(load).toHaveBeenCalledTimes(1);
	});

	it("programme le son légèrement en avance sur l'horloge", async () => {
		const { engine, triggered } = fakeEngine();
		const player = createPlayer(async () => engine);

		await player.play({ s: "bd" });

		expect(triggered).toHaveLength(1);
		expect(triggered[0].time).toBeCloseTo(10 + LEAD_TIME, 5);
	});

	it("applique la durée par défaut, et celle qu'on lui donne", async () => {
		const { engine, triggered } = fakeEngine();
		const player = createPlayer(async () => engine);

		await player.play({ note: "c4" });
		await player.play({ note: "c4" }, 1.5);

		expect(triggered[0].duration).toBe(DEFAULT_DURATION);
		expect(triggered[1].duration).toBe(1.5);
	});

	it("transmet la valeur telle quelle au moteur", async () => {
		const { engine, triggered } = fakeEngine();
		const player = createPlayer(async () => engine);

		await player.play({ note: "c4", s: "triangle" });

		expect(triggered[0].value).toEqual({ note: "c4", s: "triangle" });
	});

	// Un réseau coupé ne doit pas rendre la page définitivement muette : la
	// promesse rejetée est oubliée, donc le clic suivant retente.
	it("permet de réessayer après un chargement raté", async () => {
		const { engine } = fakeEngine();
		const load = vi
			.fn()
			.mockRejectedValueOnce(new Error("réseau coupé"))
			.mockResolvedValue(engine);
		const player = createPlayer(load);

		await expect(player.play({ s: "bd" })).rejects.toThrow("réseau coupé");
		await expect(player.play({ s: "bd" })).resolves.toBeUndefined();
		expect(load).toHaveBeenCalledTimes(2);
	});
});

describe("loadDrumKit", () => {
	it("charge le kit servi par le site, base comprise, avec la barre finale", async () => {
		const samples = vi.fn(async () => {});

		await loadDrumKit(samples);

		// Sans la barre finale, Strudel collerait le dossier au nom du fichier.
		expect(samples).toHaveBeenCalledWith(
			"/samples/uzu-drumkit/strudel.json",
			"/samples/uzu-drumkit/",
		);
	});
});
