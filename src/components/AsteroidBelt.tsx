import { Container, useTick } from "@pixi/react";
import { Asteroid } from "./Asteroid";
import { useCallback, useState } from "react";
import { config } from "../config";

interface XLocation {
	id: string;
	x: number;
}

// https://stackoverflow.com/a/2117523
function uuidv4() {
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
		(+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
	);
}

let isAddingAsteroid = false;

export function AsteroidBelt() {
	const [xLocations, setXLocations] = useState<XLocation[]>([]);

	useTick(() => {
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
				<Asteroid key={loc.id} x={loc.x} isExploding={false} handleRemove={() => removeXLocation(loc.id)} />
			))}
		</Container>
	);
}
