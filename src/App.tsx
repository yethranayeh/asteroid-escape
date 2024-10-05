import { Container, PixiRef, Sprite, Stage, useTick } from "@pixi/react";

import { Ship } from "./components/Ship";
import { Background } from "./components/Background";

import { config } from "./config";
import { useRef, useState } from "react";
import { AsteroidBelt } from "./components/AsteroidBelt";
import { gameSession, isGameOver } from "./atoms/game.atom";
import { useAtom } from "jotai";
import { RestartButton } from "./components/ui/buttons/RestartButton";

function Scene() {
	const ref = useRef(null);
	const [collidingAsteroids, setCollidingAsteroids] = useState<Array<string>>([]);

	useTick(() => {
		if (ref.current) {
			const node = ref.current as PixiRef<typeof Container>;
			const ship = node.children.find((c) => c.name === "Ship");
			const asteroidBelt = node.children.find((c) => c.name === "Asteroid-Belt");

			if (ship && asteroidBelt) {
				// check collision
				const shipBounds = ship.getBounds();

				const asteroids = (asteroidBelt.children?.filter((c: any) => c.name.startsWith("Asteroid")) ?? []) as Array<
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
			<Ship destroyed={!!collidingAsteroids.length} />
			<AsteroidBelt collidingAsteroids={collidingAsteroids} setCollidingAsteroids={setCollidingAsteroids} />
		</Container>
	);
}

const App = () => {
	const [gameOver] = useAtom(isGameOver);
	const [session] = useAtom(gameSession);
	return (
		<Stage key={session} width={config.canvas.width} height={config.canvas.height} options={{ background: 0x1099bb }}>
			<Background />

			<Scene />
			{gameOver && (
				<>
					<Sprite
						image='/game_over.png'
						x={config.canvas.width / 2}
						y={config.canvas.height / 2}
						anchor={0.5}
						scale={3}
					/>
					<RestartButton />
				</>
			)}
		</Stage>
	);
};

export default App;
