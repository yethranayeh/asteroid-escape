import { Sprite } from "@pixi/react";
import { useState } from "react";
import { useAtom } from "jotai";

import { gameAtom } from "../../../atoms/game.atom";
import { uuidv4 } from "../../../utils/uuidv4";
import { config } from "../../../config";
import { shipAtom } from "../../../atoms/ship.atom";

export function RestartButton() {
	const setIsGameOver = useAtom(gameAtom.isOver)[1];
	const setSession = useAtom(gameAtom.session)[1];
	const setTravelSpeed = useAtom(shipAtom.travelSpeed)[1];
	const setDistanceTraveled = useAtom(shipAtom.distanceTraveled)[1];
	const setHealth = useAtom(shipAtom.health)[1];
	const setIsShielded = useAtom(shipAtom.shield)[1];
	const [isHovering, setIsHovering] = useState(false);
	const [isPressed, setIsPressed] = useState(false);

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
			onmouseleave={() => {
				setIsHovering(false);
				setIsPressed(false);
			}}
			onmousedown={() => setIsPressed(true)}
			onmouseup={() => setIsPressed(false)} // FIXME: this does not get triggered when button is pressed and mouse is moved away from button and released
			image={`/ui/buttons/restart/${isPressed ? "pressed" : isHovering ? "hover" : "base"}.png`}
			x={config.canvas.width / 2}
			y={config.canvas.height / 2 + 100}
			anchor={0.5}
			scale={2}
		/>
	);
}
