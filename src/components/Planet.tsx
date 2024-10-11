import { AnimatedSprite } from "@pixi/react";
import { Resource, Texture } from "pixi.js";
import { useEffect, useState } from "react";
import { range } from "../utils/range";
import { config } from "../config";

export function Planet() {
	const [frames, setFrames] = useState<Array<Texture<Resource>>>([]);

	useEffect(() => {
		const textures = range(77).map((n) => Texture.from(`${config.baseUrl}/planet/planet-${n}.png`));

		setFrames(textures);
	}, []);

	if (frames.length === 0) {
		return null;
	}

	return <AnimatedSprite isPlaying animationSpeed={0.2} textures={frames} anchor={0.5} />;
}
