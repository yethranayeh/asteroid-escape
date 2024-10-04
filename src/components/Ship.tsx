import { AnimatedSprite, Sprite, Container } from "@pixi/react";
import { useCallback, useEffect, useState } from "react";
import { Resource, Texture } from "pixi.js";
import { config } from "../config";

const shipSize = 48;

export const Ship = () => {
	const [frames, setFrames] = useState<Array<Texture<Resource>>>([]);
	const [x, setX] = useState(config.canvas.width / 2);

	const keyListener = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "a") {
				if (x - shipSize >= 0) {
					setX(x - shipSize);
				}
			} else if (e.key === "d") {
				if (x + shipSize <= config.canvas.width) {
					setX(x + shipSize);
				}
			}
		},
		[x, setX]
	);

	useEffect(() => {
		const frameTextures = [0, 1, 2].map((n) => Texture.from(`/ship/engine/idle-${n}.png`));

		setFrames(frameTextures);
	}, []);

	useEffect(() => {
		document.addEventListener("keydown", keyListener);

		return () => {
			document.removeEventListener("keydown", keyListener);
		};
	}, [x, keyListener]);

	return (
		<Container sortableChildren x={x} y={750}>
			<Sprite image='/ship/base.png' zIndex={3} anchor={0.5} />
			<Sprite image='/ship/engine.png' zIndex={2} anchor={0.5} />
			{!!frames.length && (
				<AnimatedSprite animationSpeed={0.5} isPlaying={true} textures={frames} zIndex={1} anchor={0.5} />
			)}
		</Container>
	);
};
