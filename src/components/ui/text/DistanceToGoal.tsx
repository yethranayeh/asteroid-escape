import { useAtom } from "jotai";
import { Container, Sprite, useTick } from "@pixi/react";
import { useEffect, useState } from "react";

import { shipAtom } from "atoms/ship.atom";
import { gameAtom } from "atoms/game.atom";
import { config } from "config";

import { UIText } from "./UIText";

export function DistanceToGoal() {
	const [distanceTraveled] = useAtom(shipAtom.distanceTraveled);
	const [y, setY] = useState(15);
	const setIsFinished = useAtom(gameAtom.isFinished)[1];
	const setTravelSpeed = useAtom(shipAtom.travelSpeed)[1];

	const remainingDistance = config.game.finalDistance - distanceTraveled;

	useTick(() => {
		// Up and down motion for the indicator image
		setY(y + Math.sin(Date.now() / 100) * 0.3);
	});

	useEffect(() => {
		if (remainingDistance <= 0.01) {
			setIsFinished(true);
			setTravelSpeed(1);
		}
	}, [remainingDistance]);

	return (
		<Container x={180} y={10}>
			<Sprite image={config.baseUrl + "/ui/indicator.png"} scale={0.3} anchor={0.5} y={y} />
			<UIText text={`${remainingDistance.toFixed(2)}ua`} x={2} y={40} anchor={0.5} />
		</Container>
	);
}
