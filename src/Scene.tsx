import type { Graphics, PixiRef } from "@pixi/react";
import { Container, useTick } from "@pixi/react";
import { useRef, useState } from "react";
import { useAtom } from "jotai";

import { AsteroidBelt } from "./components/Asteroid/AsteroidBelt";
import { Ship } from "./components/Ship/Ship";
import { shipAtom } from "./atoms/ship.atom";
import { gameAtom } from "./atoms/game.atom";
import { ShieldPickup } from "./components/ShieldPickup";

export function Scene() {
	const ref = useRef(null);
	const shipHitbox = useRef<PixiRef<typeof Graphics>>(null);
	const [collidingAsteroids, setCollidingAsteroids] = useState<Array<string>>([]);
	const [shipHealth, setShipHealth] = useAtom(shipAtom.health);
	const [isShielded, setIsShielded] = useAtom(shipAtom.shield);
	const setIsGameOver = useAtom(gameAtom.isOver)[1];

	// TODO: move collision handling logic elsewhere and import it here
	useTick(() => {
		if (ref.current) {
			const node = ref.current as PixiRef<typeof Container>;
			const ship = shipHitbox.current;
			const asteroidBelt = node.children.find((c) => c.name === "Asteroid-Belt");
			const shieldPickup = node.children.find((c) => c.name === "Shield");

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
						const newCollidingAsteroid = asteroid.name!;

						if (!collidingAsteroids.includes(newCollidingAsteroid)) {
							setCollidingAsteroids((prev) => [...prev, newCollidingAsteroid]);
							if (isShielded) {
								setIsShielded(false);
							} else {
								setShipHealth((prev) => prev - 33.5);
								if (shipHealth - 33.5 <= 0) {
									setIsGameOver(true);
								}
							}
						}
					} else {
						setCollidingAsteroids((prev) => prev.filter((name) => name !== asteroid.name!));
					}
				}
			}

			if (ship && shieldPickup) {
				const shipBounds = ship.getBounds();
				const shieldBounds = shieldPickup.getBounds();

				const isColliding =
					shipBounds.x < shieldBounds.x + shieldBounds.width &&
					shipBounds.x + shipBounds.width > shieldBounds.x &&
					shipBounds.y < shieldBounds.y + shieldBounds.height &&
					shipBounds.y + shipBounds.height > shieldBounds.y;

				if (isColliding) {
					setIsShielded(true);
				}
			}
		}
	});

	return (
		<Container ref={ref}>
			<Ship ref={shipHitbox} destroyed={!!collidingAsteroids.length} />
			<AsteroidBelt collidingAsteroids={collidingAsteroids} setCollidingAsteroids={setCollidingAsteroids} />
			<ShieldPickup />
		</Container>
	);
}
