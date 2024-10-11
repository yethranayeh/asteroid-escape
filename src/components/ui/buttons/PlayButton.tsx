import { Sprite } from "@pixi/react";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { gameAtom } from "../../../atoms/game.atom";
import { config } from "../../../config";
import { Texture } from "pixi.js";

const variants = ["base", "hover"];
export function PlayButton() {
	const setGameStarted = useAtom(gameAtom.isStarted)[1];
	const [isHovering, setIsHovering] = useState(false);
	const [textures, setTextures] = useState<Array<Texture>>([]);

	// Pre-load images
	useEffect(() => {
		const result: Array<Texture> = [];
		for (const variant of variants) {
			result.push(Texture.from(`${config.baseUrl}/ui/buttons/play/${variant}.png`));
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
				setGameStarted(true);
			}}
			onmouseenter={() => setIsHovering(true)}
			onmouseleave={() => setIsHovering(false)}
			texture={isHovering ? textures[1] : textures[0]}
			x={config.canvas.width / 2}
			y={680}
			anchor={0.5}
			scale={0.5}
		/>
	);
}
