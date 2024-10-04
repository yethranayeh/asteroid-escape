import { AnimatedSprite, Sprite, Container } from "@pixi/react";
import { useEffect, useState } from "react";
import { Resource, Texture } from "pixi.js";
import { config } from "../config";

export const Ship = () => {
	const [frames, setFrames] = useState<Array<Texture<Resource>>>([]);

	useEffect(() => {
		const frameTextures = [0, 1, 2].map((n) => Texture.from(`/ship/engine/idle-${n}.png`));

		setFrames(frameTextures);
	}, []);

	return (
		<Container interactive sortableChildren x={config.canvas.width / 2} y={750} onclick={(e) => console.log(e)}>
			<Sprite image='/ship/base.png' zIndex={3} anchor={0.5} />
			<Sprite image='/ship/engine.png' zIndex={2} anchor={0.5} />
			{!!frames.length && (
				<AnimatedSprite animationSpeed={0.5} isPlaying={true} textures={frames} zIndex={1} anchor={0.5} />
			)}
		</Container>
	);
};
