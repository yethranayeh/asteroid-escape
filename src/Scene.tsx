import type { Graphics, PixiRef } from "@pixi/react";
import { Container } from "@pixi/react";
import { useTick } from "@pixi/react";
import { useRef, useState } from "react";

import { AsteroidBelt } from "./components/AsteroidBelt";
import { Ship } from "./components/Ship";

export function Scene() {
	const ref = useRef(null);
	const shipHitbox = useRef<PixiRef<typeof Graphics>>(null);
	const [collidingAsteroids, setCollidingAsteroids] = useState<Array<string>>([]);

	useTick(() => {
		if (ref.current) {
			const node = ref.current as PixiRef<typeof Container>;
			const ship = shipHitbox.current;
			const asteroidBelt = node.children.find((c) => c.name === "Asteroid-Belt");

			if (ship && asteroidBelt) {
				// check collision
				const shipBounds = ship.getBounds();

				const asteroids = (asteroidBelt.children?.filter((c: any) => c?.name?.startsWith("Asteroid")) ?? []) as Array<
					PixiRef<typeof Container>
				>;

				for (const asteroid of asteroids) {
					const asteroidBounds = asteroid.getBounds();

					const isColliding =
						shipBounds.x < asteroidBounds.x + asteroidBounds.width &&
						shipBounds.x + shipBounds.width > asteroidBounds.x &&
						shipBounds.y < asteroidBounds.y + asteroidBounds.height &&
						shipBounds.y + shipBounds.height > asteroidBounds.y;

					if (isColliding) {
						setCollidingAsteroids((prev) => {
							const unique = [...new Set([...prev, asteroid.name!])];
							return unique;
						});
					} else {
						setCollidingAsteroids((prev) => prev.filter((name) => name !== asteroid.name!));
					}
				}
			}
		}
	});

	return (
		<Container ref={ref}>
			<Ship ref={shipHitbox} destroyed={!!collidingAsteroids.length} />
			<AsteroidBelt collidingAsteroids={collidingAsteroids} setCollidingAsteroids={setCollidingAsteroids} />
		</Container>
	);
}
