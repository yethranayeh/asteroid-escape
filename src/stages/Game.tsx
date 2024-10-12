import { useEffect, useRef } from "react";
import { useAtom } from "jotai";

import { Scene } from "./Scene";
import { EndingScene } from "./EndingScene";

import { RestartButton } from "../components/ui/buttons/RestartButton";
import { GameOver } from "../components/ui/text/GameOver";
import { UI } from "../components/ui/UI";
import { UIText } from "../components/ui/text/UIText";

import { shipAtom } from "../atoms/ship.atom";
import { gameAtom } from "../atoms/game.atom";

export function Game() {
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
