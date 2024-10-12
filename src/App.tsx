import { Stage } from "@pixi/react";
import { useAtom } from "jotai";

import { Game } from "stages/Game";
import { StartScreen } from "stages/StartScreen/StartScreen";

import { Background } from "components/Background";

import { gameAtom } from "atoms/game.atom";
import { config } from "config";

const App = () => {
	const [isGameStarted] = useAtom(gameAtom.isStarted);
	const [session] = useAtom(gameAtom.session);

	return (
		<Stage key={session} width={config.canvas.width} height={config.canvas.height} options={{ background: "#000" }}>
			<Background />

			{isGameStarted ? <Game /> : <StartScreen />}
		</Stage>
	);
};

export default App;
