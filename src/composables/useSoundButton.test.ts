import { describe, expect, it, vi } from "vitest";
import { useSoundButton } from "@/composables/useSoundButton";

describe("useSoundButton", () => {
	it("allume le bouton pendant la durée du retour visuel, puis l'éteint", async () => {
		vi.useFakeTimers();
		const { active, trigger } = useSoundButton(async () => {}, 200);

		const played = trigger("bd", { s: "bd" });
		expect(active.value).toBe("bd");

		await played;
		vi.advanceTimersByTime(200);
		expect(active.value).toBeNull();

		vi.useRealTimers();
	});

	// Sans la garde sur l'identifiant, le minuteur du premier bouton éteindrait
	// le second, pressé entre-temps.
	it("n'éteint pas un bouton pressé entre-temps", async () => {
		vi.useFakeTimers();
		const { active, trigger } = useSoundButton(async () => {}, 200);

		await trigger("bd", { s: "bd" });
		vi.advanceTimersByTime(120);
		await trigger("sd", { s: "sd" });
		vi.advanceTimersByTime(100); // le minuteur de « bd » arrive à échéance

		expect(active.value).toBe("sd");

		vi.useRealTimers();
	});

	it("transmet la valeur et la durée au lecteur", async () => {
		const play = vi.fn(async () => {});
		const { trigger } = useSoundButton(play);

		await trigger("c", { note: "c4", s: "triangle" }, 0.6);

		expect(play).toHaveBeenCalledWith({ note: "c4", s: "triangle" }, 0.6);
	});

	it("signale l'échec sans laisser remonter l'erreur", async () => {
		const { failed, trigger } = useSoundButton(async () => {
			throw new Error("réseau coupé");
		});

		await expect(trigger("bd", { s: "bd" })).resolves.toBeUndefined();
		expect(failed.value).toBe(true);
	});

	it("efface l'échec dès qu'un son repasse", async () => {
		let broken = true;
		const { failed, trigger } = useSoundButton(async () => {
			if (broken) {
				throw new Error("réseau coupé");
			}
		});

		await trigger("bd", { s: "bd" });
		expect(failed.value).toBe(true);

		broken = false;
		await trigger("bd", { s: "bd" });
		expect(failed.value).toBe(false);
	});
});
