import { Container, useTick } from "@pixi/react";
import { Asteroid } from "./Asteroid";
import { useCallback, useRef, useState } from "react";
import { useAtom } from "jotai";
import { gameAtom } from "../../atoms/game.atom";
import { uuidv4 } from "../../utils/uuidv4";
import { getRandomXLocation } from "../../utils/getRandomXLocation";

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
	const [max, setMax] = useState(10);
	const [isGameOver] = useAtom(gameAtom.isOver);

	const lastAsteroidTimeRef = useRef(-1);
	const lastIntervalUpdateTimeRef = useRef(-1);

	useTick(() => {
		if (isGameOver) {
			return;
		}

		const currentTime = Math.floor(performance.now() / 1000);

		// Handle asteroid creation logic
		if (currentTime !== lastAsteroidTimeRef.current && currentTime % interval === 0 && xLocations.length < max) {
			const newXLocation: XLocation = {
				id: uuidv4(),
				x: getRandomXLocation()
			};
			setXLocations((prevLocations) => [...prevLocations, newXLocation]);

			// Update last asteroid spawn time to the current time
			lastAsteroidTimeRef.current = currentTime;
		}

		// Handle interval update logic
		if (currentTime !== lastIntervalUpdateTimeRef.current && currentTime % 10 === 0 && interval > 1) {
			setInterval((prevInterval) => prevInterval - 1);
			setMax((prev) => prev + 10);

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
