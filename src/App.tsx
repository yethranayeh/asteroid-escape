import { Stage } from "@pixi/react";
import { useAtom } from "jotai";

import { config } from "./config";
import { gameAtom } from "./atoms/game.atom";

import { Background } from "./components/Background";

import { useEffect, useState } from "react";
import { Game } from "./stages/Game";
import { StartScreen } from "./stages/StartScreen";

const App = () => {
	const [isGameStarted] = useAtom(gameAtom.isStarted);
	const [session] = useAtom(gameAtom.session);
	const [reRendered, setReRendered] = useState(false);

	// Force re-render to apply fonts. I don't know why it does not apply them on initial render.
	useEffect(() => {
		const timeout = setTimeout(() => setReRendered(true), 500);
		if (reRendered === true) {
			clearTimeout(timeout);
		}

		return () => clearTimeout(timeout);
	}, [reRendered, setReRendered]);

	return (
		<Stage key={session} width={config.canvas.width} height={config.canvas.height} options={{ background: 0x1099bb }}>
			<Background />

			{isGameStarted ? <Game /> : <StartScreen />}
		</Stage>
	);
};

export default App;
