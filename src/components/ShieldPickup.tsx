import { Sprite, useTick } from "@pixi/react";
import { useState } from "react";
import { useAtom } from "jotai";

import { getRandomXLocation } from "utils/getRandomXLocation";
import { shipAtom } from "atoms/ship.atom";
import { config } from "config";

export function ShieldPickup() {
	const [isShielded] = useAtom(shipAtom.shield);
	const [travelSpeed] = useAtom(shipAtom.travelSpeed);
	const [x, setX] = useState(getRandomXLocation());
	const [y, setY] = useState(0);

	useTick(() => {
		if (!isShielded) {
			if (y + 1 > config.canvas.height) {
				setY(0);
				setX(getRandomXLocation());
			} else {
				setY(y + 1 * travelSpeed);
			}
		} else {
			setY(0);
			setX(getRandomXLocation());
		}
	});

	if (isShielded) {
		return null;
	}

	return <Sprite name='Shield' image={config.baseUrl + "/environment/shield.png"} x={x} y={y} scale={2} />;
}
