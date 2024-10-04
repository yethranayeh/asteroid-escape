import type { Resource } from "pixi.js";

import { AnimatedSprite, PixiRef, useTick } from "@pixi/react";
import { Texture } from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { config } from "../config";

export const Asteroid = ({ isExploding, x, handleRemove }: { isExploding: boolean; x: number; handleRemove: any }) => {
	const [frames, setFrames] = useState<Array<Texture<Resource>>>([]);
	const [visible, setVisible] = useState(true);
	const [y, setY] = useState(0);
	const [rotation, setRotation] = useState(0);
	const ref = useRef<PixiRef<typeof AnimatedSprite>>(null);
	const direction = useRef(Math.round(Math.random()));

	const handleExplosion = useCallback(
		(currentFrame: number) => {
			if (isExploding && currentFrame === 6) {
				setVisible(false);
				handleRemove();
			}
		},
		[isExploding]
	);

	useEffect(() => {
		const frameTextures = [...Array(7).keys()].map((n) => Texture.from(`/environment/asteroid/asteroid-${n}.png`));

		setFrames(frameTextures);
	}, []);

	useTick(() => {
		const diff = Math.random() * 0.005;
		if (direction.current === 1) {
			setRotation(rotation + diff);
		} else {
			setRotation(rotation - diff);
		}

		if (isExploding) {
			return;
		}

		const asteroidSpriteHeight = ref?.current?.height ?? 0;

		if (y + 1 > config.canvas.height + asteroidSpriteHeight) {
			setVisible(false);
			handleRemove();
		} else {
			setY((y) => y + 1);
		}
	});

	if (frames.length === 0 || !visible) {
		return null;
	}

	return (
		<AnimatedSprite
			ref={ref}
			name='Asteroid'
			eventMode='static'
			animationSpeed={0.1}
			isPlaying={isExploding}
			textures={frames}
			x={x}
			y={y}
			anchor={{ x: 0.5, y: 0.5 }}
			rotation={rotation}
			zIndex={20}
			onFrameChange={handleExplosion}
		/>
	);
};
