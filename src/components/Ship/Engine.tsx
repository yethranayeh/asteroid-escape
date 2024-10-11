import { AnimatedSprite } from "@pixi/react";
import { Resource, Texture } from "pixi.js";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { range } from "../../utils/range";
import { gameAtom } from "../../atoms/game.atom";
import { shipAtom } from "../../atoms/ship.atom";
import { config } from "../../config";

export function Engine() {
	const [idleFrames, setIdleFrames] = useState<Array<Texture<Resource>>>([]);
	const [poweredFrames, setPoweredFrames] = useState<Array<Texture<Resource>>>([]);
	const [isGameOver] = useAtom(gameAtom.isOver);
	const [travelSpeed] = useAtom(shipAtom.travelSpeed);

	useEffect(() => {
		const idleTextures = range(4).map((n) => Texture.from(`${config.baseUrl}/ship/engine/idle-${n}.png`));

		setIdleFrames(idleTextures);

		const poweredTextures = range(4).map((n) => Texture.from(`${config.baseUrl}/ship/engine/powered-${n}.png`));
		setPoweredFrames(poweredTextures);
	}, []);

	if (isGameOver) {
		return null;
	}

	return (
		<>
			{!!idleFrames.length && (
				<AnimatedSprite
					isPlaying
					animationSpeed={0.5}
					textures={idleFrames}
					zIndex={1}
					anchor={0.5}
					y={10}
					visible={travelSpeed === 1}
				/>
			)}
			{!!poweredFrames.length && (
				<AnimatedSprite
					isPlaying
					animationSpeed={0.5}
					textures={poweredFrames}
					zIndex={1}
					anchor={0.5}
					y={10}
					visible={travelSpeed > 1}
				/>
			)}
		</>
	);
}
