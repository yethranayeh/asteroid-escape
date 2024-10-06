import { useAtom } from "jotai";
import { shipAtom } from "../../../atoms/ship.atom";
import { UIText } from "./UIText";
import { Container, Sprite, useTick } from "@pixi/react";
import { useEffect, useState } from "react";
import { config } from "../../../config";
import { gameAtom } from "../../../atoms/game.atom";

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
			<Sprite image='/ui/indicator.png' scale={2} y={y} />
			<UIText text={`${remainingDistance.toFixed(2)}ua`} x={5} y={40} anchor={0.5} />
		</Container>
	);
}
