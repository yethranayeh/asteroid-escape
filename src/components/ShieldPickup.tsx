import { Sprite, useTick } from "@pixi/react";
import { useAtom } from "jotai";
import { shipAtom } from "../atoms/ship.atom";
import { useState } from "react";
import { config } from "../config";

export function ShieldPickup() {
	const [isShielded] = useAtom(shipAtom.shield);
	const [travelSpeed] = useAtom(shipAtom.travelSpeed);
	const [y, setY] = useState(0);

	useTick(() => {
		if (!isShielded) {
			setY((prev) => {
				if (prev + 1 > config.canvas.height) {
					return 0;
				} else {
					return prev + 1 * travelSpeed;
				}
			});
		} else {
			setY(0);
		}
	});

	if (isShielded) {
		return null;
	}

	return <Sprite name='Shield' image='/environment/shield.png' x={160} y={y} scale={2} />;
}
