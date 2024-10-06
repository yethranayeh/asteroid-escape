import { Stage } from "@pixi/react";
import { useAtom } from "jotai";

import { config } from "./config";
import { gameSession, isGameOver } from "./atoms/game.atom";

import { Background } from "./components/Background";
import { RestartButton } from "./components/ui/buttons/RestartButton";
import { Scene } from "./Scene";
import { GameOver } from "./components/ui/text/GameOver";

const App = () => {
	const [gameOver] = useAtom(isGameOver);
	const [session] = useAtom(gameSession);

	return (
		<Stage key={session} width={config.canvas.width} height={config.canvas.height} options={{ background: 0x1099bb }}>
			<Background />

			<Scene />
			{gameOver && (
				<>
					<GameOver />
					<RestartButton />
				</>
			)}
		</Stage>
	);
};

export default App;
