import { atom } from "jotai";

export const shipAtom = {
	health: atom(100),
	travelSpeed: atom(1),
	distanceTraveled: atom(0)
};
