import { Sprite } from "@pixi/react";
import { useState } from "react";
import { useAtom } from "jotai";

import { gameAtom } from "../../../atoms/game.atom";
import { config } from "../../../config";

export function PlayButton() {
	const setGameStarted = useAtom(gameAtom.isStarted)[1];
	const [isHovering, setIsHovering] = useState(false);
	const [isPressed, setIsPressed] = useState(false);

	return (
		<Sprite
			eventMode='static'
			onclick={() => {
				setGameStarted(true);
			}}
			onmouseenter={() => setIsHovering(true)}
			onmouseleave={() => {
				setIsHovering(false);
				setIsPressed(false);
			}}
			onmousedown={() => setIsPressed(true)}
			onmouseup={() => setIsPressed(false)} // FIXME: this does not get triggered when button is pressed and mouse is moved away from button and released
			image={`${config.baseUrl}/ui/buttons/play/${isPressed ? "pressed" : isHovering ? "hover" : "base"}.png`}
			x={config.canvas.width / 2}
			y={650}
			anchor={0.5}
			scale={1.5}
		/>
	);
}
