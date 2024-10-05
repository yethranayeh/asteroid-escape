import { AnimatedSprite, Sprite, Container, useTick, Graphics } from "@pixi/react";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { Resource, Texture } from "pixi.js";
import { config } from "../config";
import { isGameOver } from "../atoms/game.atom";
import { useAtom } from "jotai";

const shipSize = 48;

function draw(g: any) {
	g.beginFill(0x07f72f, 0.4);

	g.moveTo(-15, -13);
	g.lineTo(15, -13);
	g.lineTo(15, 13);
	g.lineTo(-15, 13);
	g.endFill();
}

export const Hitbox = forwardRef((_, ref: any) => <Graphics ref={ref} draw={draw} visible={false} />);

export const Ship = forwardRef(({ destroyed }: { destroyed: boolean }, ref: any) => {
	const [frames, setFrames] = useState<Array<Texture<Resource>>>([]);
	const [x, setX] = useState(config.canvas.width / 2);
	const [rotation, setRotation] = useState(0);
	const [gameOver] = useAtom(isGameOver);

	const keyListener = useCallback(
		(e: KeyboardEvent) => {
			if (destroyed || gameOver) {
				return;
			}

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
		[x, setX, destroyed, gameOver]
	);

	useEffect(() => {
		const frameTextures = [...Array(3).keys()].map((n) => Texture.from(`/ship/engine/idle-${n}.png`));

		setFrames(frameTextures);
	}, []);

	useEffect(() => {
		document.addEventListener("keydown", keyListener);

		return () => {
			document.removeEventListener("keydown", keyListener);
		};
	}, [x, keyListener, destroyed, gameOver]);

	useTick(() => {
		if (gameOver) {
			setRotation(rotation + 0.01);
		}
	});

	return (
		<Container sortableChildren x={x} y={750} rotation={rotation}>
			<Hitbox ref={ref} />
			<Sprite image={`/ship/${gameOver ? "damaged" : "base"}.png`} zIndex={3} anchor={0.5} />
			<Sprite image='/ship/engine.png' zIndex={2} anchor={0.5} />
			{!gameOver && !!frames.length && (
				<AnimatedSprite isPlaying animationSpeed={0.5} textures={frames} zIndex={1} anchor={0.5} />
			)}
		</Container>
	);
});
