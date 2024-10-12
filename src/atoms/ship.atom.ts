import { atom } from "jotai";

export const shipAtom = {
	health: atom(100),
	shield: atom(false),
	travelSpeed: atom(0.2),
	distanceTraveled: atom(0)
};
