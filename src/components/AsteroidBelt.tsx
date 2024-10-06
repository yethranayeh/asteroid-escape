import { Container, useTick } from "@pixi/react";
import { Asteroid } from "./Asteroid";
import { useCallback, useRef, useState } from "react";
import { config } from "../config";
import { useAtom } from "jotai";
import { isGameOver } from "../atoms/game.atom";
import { uuidv4 } from "../utils/uuidv4";

interface XLocation {
	id: string;
	x: number;
}
interface Props {
	collidingAsteroids: Array<string>;
	setCollidingAsteroids: any;
}
export function AsteroidBelt({ collidingAsteroids, setCollidingAsteroids }: Props) {
	const [xLocations, setXLocations] = useState<XLocation[]>([]);
	const [interval, setInterval] = useState(3);
	const [gameOver] = useAtom(isGameOver);

	const lastAsteroidTimeRef = useRef(-1); // Using useRef to persist across renders
	const lastIntervalUpdateTimeRef = useRef(-1);

	useTick(() => {
		if (gameOver) {
			return;
		}

		const currentTime = Math.floor(performance.now() / 1000);

		// Handle asteroid creation logic
		if (currentTime !== lastAsteroidTimeRef.current && currentTime % interval === 0 && xLocations.length < 10) {
			const newXLocation: XLocation = {
				id: uuidv4(),
				x: Math.floor(Math.random() * config.canvas.width)
			};
			setXLocations((prevLocations) => [...prevLocations, newXLocation]);

			// Update last asteroid spawn time to the current time
			lastAsteroidTimeRef.current = currentTime;
		}

		// Handle interval update logic
		if (currentTime !== lastIntervalUpdateTimeRef.current && currentTime % 10 === 0 && interval > 1) {
			setInterval((prevInterval) => prevInterval - 1);

			// Update the last interval update time
			lastIntervalUpdateTimeRef.current = currentTime;
		}
	});

	const removeXLocation = useCallback((id: string) => {
		setXLocations((prevLocations) => prevLocations.filter((location) => location.id !== id));
	}, []);

	return (
		<Container name='Asteroid-Belt'>
			{xLocations.map((loc) => (
				<Asteroid
					key={loc.id}
					name={`Asteroid-${loc.id}`}
					x={loc.x}
					isExploding={collidingAsteroids.includes(`Asteroid-${loc.id}`)}
					handleRemove={() => {
						removeXLocation(loc.id);
						setCollidingAsteroids(collidingAsteroids.filter((id) => id !== `Asteroid-${loc.id}`));
					}}
				/>
			))}
		</Container>
	);
}
