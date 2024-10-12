import { useEffect, useState } from "react";
import { AnimatedSprite } from "@pixi/react";
import { Resource, Texture } from "pixi.js";

import { range } from "utils/range";
import { config } from "config";

export function Shield() {
	const [frames, setFrames] = useState<Array<Texture<Resource>>>([]);

	useEffect(() => {
		const textures = range(6).map((n) => Texture.from(`${config.baseUrl}/ship/shield/shield-${n}.png`));

		setFrames(textures);
	}, []);

	if (frames.length === 0) {
		return null;
	}

	return <AnimatedSprite isPlaying animationSpeed={0.5} textures={frames} zIndex={5} anchor={0.5} />;
}
