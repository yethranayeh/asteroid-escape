import { Container, useTick } from "@pixi/react";
import { Asteroid } from "./Asteroid";
import { useCallback, useState } from "react";
import { config } from "../config";
import { useAtom } from "jotai";
import { isGameOver } from "../atoms/game.atom";
import { uuidv4 } from "../utils/uuidv4";

interface XLocation {
	id: string;
	x: number;
}

let isAddingAsteroid = false;

interface Props {
	collidingAsteroids: Array<string>;
	setCollidingAsteroids: any;
}
export function AsteroidBelt({ collidingAsteroids, setCollidingAsteroids }: Props) {
	const [xLocations, setXLocations] = useState<XLocation[]>([]);
	const [gameOver] = useAtom(isGameOver);

	useTick(() => {
		if (gameOver) {
			return;
		}
		const now = Math.floor(performance.now() / 1000);

		if (!isAddingAsteroid && now !== 0 && now % 3 === 0 && xLocations.length < 10) {
			const newXLocation: XLocation = {
				id: uuidv4(),
				x: Math.floor(Math.random() * config.canvas.width)
			};

			setXLocations((prevLocations) => [...prevLocations, newXLocation]);
			isAddingAsteroid = true;
		} else if (isAddingAsteroid && now % 3 !== 0) {
			isAddingAsteroid = false;
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
