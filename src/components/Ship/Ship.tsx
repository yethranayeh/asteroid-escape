import { Sprite, Container, useTick } from "@pixi/react";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { useAtom } from "jotai";

import { config } from "../../config";
import { isGameOver } from "../../atoms/game.atom";
import { shipAtom } from "../../atoms/ship.atom";

import { Hitbox } from "./Hitbox";
import { Engine } from "./Engine";

const shipSize = 48;

export const Ship = forwardRef(({ destroyed }: { destroyed: boolean }, ref: any) => {
	const [x, setX] = useState(config.canvas.width / 2);
	const [rotation, setRotation] = useState(0);
	const [gameOver] = useAtom(isGameOver);
	const setTravelSpeed = useAtom(shipAtom.travelSpeed)[1];

	const keyDownListener = useCallback(
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
			} else if (e.key === "w") {
				setTravelSpeed(5);
			}
		},
		[x, setX, destroyed, gameOver]
	);
	const keyUpListener = useCallback(
		(e: KeyboardEvent) => {
			if (destroyed || gameOver) {
				return;
			}

			if (e.key === "w") {
				setTravelSpeed(1);
			}
		},
		[x, setX, destroyed, gameOver]
	);

	useEffect(() => {
		document.addEventListener("keydown", keyDownListener);
		document.addEventListener("keyup", keyUpListener);

		return () => {
			document.removeEventListener("keydown", keyDownListener);
			document.removeEventListener("keyup", keyUpListener);
		};
	}, [x, keyDownListener, destroyed, gameOver]);

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
			<Engine />
		</Container>
	);
});
