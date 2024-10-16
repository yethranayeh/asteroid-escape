import type { Resource } from "pixi.js";
import type { PixiRef } from "@pixi/react";

import { AnimatedSprite, useTick } from "@pixi/react";
import { Texture } from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";

import { Hitbox } from "./Hitbox";

import { range } from "utils/range";
import { shipAtom } from "atoms/ship.atom";
import { config } from "config";

interface Props {
	name: string;
	isExploding: boolean;
	x: number;
	handleRemove: any;
}

export const Asteroid = ({ name, isExploding, x, handleRemove }: Props) => {
	const [frames, setFrames] = useState<Array<Texture<Resource>>>([]);
	const [y, setY] = useState(0);
	const [rotation, setRotation] = useState(0);
	const ref = useRef<PixiRef<typeof AnimatedSprite>>(null);
	const direction = useRef(Math.round(Math.random()));
	const [travelSpeed] = useAtom(shipAtom.travelSpeed);

	const handleExplosion = useCallback(
		(currentFrame: number) => {
			if (isExploding) {
				if (currentFrame === 6) {
					handleRemove();
				}
			}
		},
		[isExploding]
	);

	useEffect(() => {
		const frameTextures = range(7).map((n) => Texture.from(`${config.baseUrl}/environment/asteroid/asteroid-${n}.png`));

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
			handleRemove();
		} else {
			// If the ship travel speed decreases due to collision, the other asteroid floating speeds should remain constant at "1"
			const factor = travelSpeed <= 1 ? 1 : travelSpeed;
			setY((y) => y + 1 * factor);
		}
	});

	if (frames.length === 0) {
		return null;
	}

	return (
		<>
			<Hitbox name={name} x={x} y={y} />
			<AnimatedSprite
				ref={ref}
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
		</>
	);
};
