import { Sprite } from "@pixi/react";
import { useAtom } from "jotai";
import { shipAtom } from "../../atoms/ship.atom";

function getHullName(hp: number) {
	if (hp <= 0) {
		return "very-damaged";
	} else if (hp <= 33) {
		return "damaged";
	} else if (hp <= 67) {
		return "slightly-damaged";
	} else if (hp <= 100) {
		return "base";
	}

	return "base";
}

// TODO: pre-load images so there is no flashing
export function Hull() {
	const [health] = useAtom(shipAtom.health);
	return <Sprite image={`/ship/hull/${getHullName(health)}.png`} zIndex={3} anchor={0.5} />;
}
