import { Stage, Text } from "@pixi/react";
import { useAtom } from "jotai";

import { config } from "./config";
import { gameAtom } from "./atoms/game.atom";

import { Scene } from "./Scene";
import { Background } from "./components/Background";
import { RestartButton } from "./components/ui/buttons/RestartButton";
import { GameOver } from "./components/ui/text/GameOver";
import { UI } from "./components/ui/UI";
import { EndingScene } from "./EndingScene";

import { TextStyle } from "pixi.js";
import { PlayButton } from "./components/ui/buttons/PlayButton";
import { UIText } from "./components/ui/text/UIText";
import { shipAtom } from "./atoms/ship.atom";
import { useEffect, useRef } from "react";

function Game() {
	const [isGameOver] = useAtom(gameAtom.isOver);
	const [isFinished] = useAtom(gameAtom.isFinished);
	const [travelDistance] = useAtom(shipAtom.distanceTraveled);
	const finalDistance = useRef(0);

	useEffect(() => {
		if (isGameOver) {
			finalDistance.current = travelDistance;
		}
	}, [isGameOver]);

	return (
		<>
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
					<UIText
						text={`You managed to travel ${finalDistance.current.toFixed(2)} astronomical units`}
						x={70}
						y={420}
					/>
					<RestartButton />
				</>
			)}
		</>
	);
}

const style = new TextStyle({
	fontFamily: "monospace",
	fill: 0xffffff,
	fontSize: 18,
	fontWeight: "400",
	wordWrap: true,
	wordWrapWidth: config.canvas.width - 24
});

const controls = new TextStyle({
	fontFamily: "sans-serif",
	fill: 0xffffff,
	fontSize: 14,
	fontWeight: "600",
	wordWrap: true,
	wordWrapWidth: config.canvas.width - 24
});

function StartScreen() {
	return (
		<>
			<Text
				anchor={0.5}
				x={config.canvas.width / 2}
				y={config.canvas.height / 2 - 50}
				style={style}
				text={`In the distant future, the Earth has become uninhabitable, and humanity is on the brink of extinction.

			The last remaining survivors have boarded a small but advanced spaceship, The Glider, on a desperate mission to reach a distant, habitable planet known only as Elysium.

			This planet, though distant and shrouded in mystery, is the only hope for humanity's survival.

			However, the journey is perilous. The ship must navigate through a treacherous asteroid belt before reaching safety.`}
			/>
			<Text anchor={0.5} x={config.canvas.width / 2} y={600} style={controls} text='(A - left, D - right, W - boost)' />

			<PlayButton />
		</>
	);
}

const App = () => {
	const [isGameStarted] = useAtom(gameAtom.isStarted);
	const [session] = useAtom(gameAtom.session);

	return (
		<Stage key={session} width={config.canvas.width} height={config.canvas.height} options={{ background: 0x1099bb }}>
			<Background />

			{isGameStarted ? <Game /> : <StartScreen />}
		</Stage>
	);
};

export default App;
