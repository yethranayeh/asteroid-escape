import { Stage } from "@pixi/react";
import { useAtom } from "jotai";

import { config } from "./config";
import { gameAtom } from "./atoms/game.atom";

import { Scene } from "./Scene";
import { Background } from "./components/Background";
import { RestartButton } from "./components/ui/buttons/RestartButton";
import { GameOver } from "./components/ui/text/GameOver";
import { UI } from "./components/ui/UI";
import { EndingScene } from "./EndingScene";

const App = () => {
	const [isGameOver] = useAtom(gameAtom.isOver);
	const [isFinished] = useAtom(gameAtom.isFinished);
	const [session] = useAtom(gameAtom.session);

	return (
		<Stage key={session} width={config.canvas.width} height={config.canvas.height} options={{ background: 0x1099bb }}>
			<Background />

			{isFinished ? (
				<EndingScene />
			) : (
				<>
					<Scene />
					<UI />
				</>
			)}

			{isGameOver && (
				<>
					<GameOver />
					<RestartButton />
				</>
			)}
		</Stage>
	);
};

export default App;
