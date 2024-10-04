import { Container, PixiRef, Stage, useTick } from "@pixi/react";

import { Ship } from "./components/Ship";
import { Background } from "./components/Background";

import { config } from "./config";
import { Asteroid } from "./components/Asteroid";
import { useRef, useState } from "react";
import { Ruler } from "./components/Ruler";
import { AsteroidBelt } from "./components/AsteroidBelt";

function XYZ() {
	const ref = useRef(null);
	const [colliding, setColliding] = useState(false);

	useTick(() => {
		if (ref.current) {
			const node = ref.current as PixiRef<typeof Container>;
			const ship = node.children.find((c) => c.name === "Ship");
			const asteroidBelt = node.children.find((c) => c.name === "Asteroid-Belt");

			if (ship && asteroidBelt) {
				// check collision
				const shipBounds = ship.getBounds();

				const asteroids = (asteroidBelt.children?.filter((c: any) => c.name === "Asteroid") ?? []) as Array<
					PixiRef<typeof Container>
				>;

				let anyColliding = false;
				for (const asteroid of asteroids) {
					const asteroidBounds = asteroid.getBounds();

					const isColliding =
						shipBounds.x < asteroidBounds.x + asteroidBounds.width &&
						shipBounds.x + shipBounds.width > asteroidBounds.x &&
						shipBounds.y < asteroidBounds.y + asteroidBounds.height &&
						shipBounds.y + shipBounds.height > asteroidBounds.y;

					if (isColliding) {
						anyColliding = true;
						break;
					}
				}
				setColliding(anyColliding);
			}
		}
	});

	return (
		<Container ref={ref}>
			<Ship />
			<AsteroidBelt />

			{colliding && <Ruler />}
		</Container>
	);
}

const App = () => {
	return (
		<Stage width={config.canvas.width} height={config.canvas.height} options={{ background: 0x1099bb }}>
			<Background />

			<XYZ />
		</Stage>
	);
};

export default App;
