import { Sprite } from "@pixi/react";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { gameAtom } from "../../../atoms/game.atom";
import { uuidv4 } from "../../../utils/uuidv4";
import { config } from "../../../config";
import { shipAtom } from "../../../atoms/ship.atom";
import { Texture } from "pixi.js";

const variants = ["base", "hover"];
export function RestartButton() {
	const setIsGameOver = useAtom(gameAtom.isOver)[1];
	const setSession = useAtom(gameAtom.session)[1];
	const setTravelSpeed = useAtom(shipAtom.travelSpeed)[1];
	const setDistanceTraveled = useAtom(shipAtom.distanceTraveled)[1];
	const setHealth = useAtom(shipAtom.health)[1];
	const setIsShielded = useAtom(shipAtom.shield)[1];
	const [isHovering, setIsHovering] = useState(false);
	const [textures, setTextures] = useState<Array<Texture>>([]);

	// Pre-load images
	useEffect(() => {
		const result: Array<Texture> = [];
		for (const variant of variants) {
			result.push(Texture.from(`${config.baseUrl}/ui/buttons/restart/${variant}.png`));
		}

		setTextures(result);
	}, []);

	if (textures.length === 0) {
		return null;
	}

	return (
		<Sprite
			eventMode='static'
			onclick={() => {
				setIsGameOver(false);
				setHealth(100);
				setIsShielded(false);
				setTravelSpeed(1);
				setDistanceTraveled(0);
				setSession(uuidv4());
			}}
			onmouseenter={() => setIsHovering(true)}
			onmouseleave={() => setIsHovering(false)}
			texture={isHovering ? textures[1] : textures[0]}
			x={config.canvas.width / 2}
			y={config.canvas.height / 2 + 100}
			anchor={0.5}
			scale={0.5}
		/>
	);
}
