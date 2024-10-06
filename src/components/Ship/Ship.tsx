import { useTick } from "@pixi/react";

import { forwardRef, useCallback, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Spring } from "react-spring";

import { config } from "../../config";
import { gameAtom } from "../../atoms/game.atom";
import { shipAtom } from "../../atoms/ship.atom";
import { getDistanceTraveled } from "./utils/getDistanceTraveled";

import { ShipPure } from "./ShipPure";

const shipSize = 48;

export const Ship = forwardRef(({ destroyed }: { destroyed: boolean }, ref: any) => {
	const [x, setX] = useState(config.canvas.width / 2);
	const [rotation, setRotation] = useState(0);
	const [travelSpeed, setTravelSpeed] = useAtom(shipAtom.travelSpeed);
	const [isGameOver] = useAtom(gameAtom.isOver);
	const [isFinished] = useAtom(gameAtom.isFinished);
	const setDistanceTraveled = useAtom(shipAtom.distanceTraveled)[1];

	const keyDownListener = useCallback(
		(e: KeyboardEvent) => {
			if (destroyed || isGameOver) {
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
		[x, setX, destroyed, isGameOver]
	);
	const keyUpListener = useCallback(
		(e: KeyboardEvent) => {
			if (destroyed || isGameOver) {
				return;
			}

			if (e.key === "w") {
				setTravelSpeed(1);
			}
		},
		[x, setX, destroyed, isGameOver]
	);

	useEffect(() => {
		if (isFinished) {
			document.removeEventListener("keydown", keyDownListener);
			document.removeEventListener("keyup", keyUpListener);
			setX(config.canvas.width / 2);
		}
	}, [isFinished]);

	useEffect(() => {
		if (!isFinished) {
			document.addEventListener("keydown", keyDownListener);
			document.addEventListener("keyup", keyUpListener);
		}

		return () => {
			document.removeEventListener("keydown", keyDownListener);
			document.removeEventListener("keyup", keyUpListener);
		};
	}, [x, keyDownListener, destroyed, isGameOver, isFinished]);

	useTick((delta) => {
		if (isGameOver) {
			setRotation(rotation + 0.01);
			setTravelSpeed(0.3);
		}

		setDistanceTraveled((prevDistance) => getDistanceTraveled({ prevDistance, travelSpeed, delta }));
	});

	return (
		<Spring from={{ x: config.canvas.width / 2, y: 750 }} to={{ x, y: travelSpeed > 1 ? 650 : 750 }}>
			{(props) => <ShipPure ref={ref} {...props} rotation={rotation} />}
		</Spring>
	);
});
