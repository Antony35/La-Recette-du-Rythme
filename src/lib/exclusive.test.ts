import { describe, expect, it, vi } from "vitest";
import { createExclusive } from "@/lib/exclusive";

describe("createExclusive", () => {
	it("n'arrête rien quand personne ne joue", () => {
		const exclusive = createExclusive();
		const stop = vi.fn();

		exclusive.claim(stop);

		expect(stop).not.toHaveBeenCalled();
		expect(exclusive.active).toBe(stop);
	});

	it("arrête le lecteur précédent quand un autre prend la main", () => {
		const exclusive = createExclusive();
		const first = vi.fn();
		const second = vi.fn();

		exclusive.claim(first);
		exclusive.claim(second);

		expect(first).toHaveBeenCalledTimes(1);
		expect(second).not.toHaveBeenCalled();
		expect(exclusive.active).toBe(second);
	});

	// Sans la garde, réévaluer son propre code s'arrêterait soi-même.
	it("ne s'arrête pas soi-même quand on se redéclare", () => {
		const exclusive = createExclusive();
		const stop = vi.fn();

		exclusive.claim(stop);
		exclusive.claim(stop);

		expect(stop).not.toHaveBeenCalled();
	});

	it("libère la place", () => {
		const exclusive = createExclusive();
		const stop = vi.fn();

		exclusive.claim(stop);
		exclusive.release(stop);

		expect(exclusive.active).toBeNull();
	});

	// Le cas qui casse sans garde : un composant démonté libère après qu'un
	// autre a pris la main, et efface le lecteur actif.
	it("ignore une libération venue d'un lecteur qui n'est plus actif", () => {
		const exclusive = createExclusive();
		const first = vi.fn();
		const second = vi.fn();

		exclusive.claim(first);
		exclusive.claim(second);
		exclusive.release(first);

		expect(exclusive.active).toBe(second);
	});

	it("isole les instances les unes des autres", () => {
		const a = createExclusive();
		const b = createExclusive();
		const stopA = vi.fn();
		const stopB = vi.fn();

		a.claim(stopA);
		b.claim(stopB);

		expect(stopA).not.toHaveBeenCalled();
		expect(a.active).toBe(stopA);
		expect(b.active).toBe(stopB);
	});
});
