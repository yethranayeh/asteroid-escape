import { Sprite, Stage } from "@pixi/react";

import { Background } from "./components/Background";

import { config } from "./config";

import { gameSession, isGameOver } from "./atoms/game.atom";
import { useAtom } from "jotai";
import { RestartButton } from "./components/ui/buttons/RestartButton";
import { Scene } from "./Scene";

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
