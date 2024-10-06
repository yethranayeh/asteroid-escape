import { useAtom } from "jotai";
import { shipAtom } from "../../../atoms/ship.atom";
import { UIText } from "./UIText";
import { Container, Sprite, useTick } from "@pixi/react";
import { useState } from "react";
import { config } from "../../../config";

export function DistanceToGoal() {
	const [distanceTraveled] = useAtom(shipAtom.distanceTraveled);
	const [y, setY] = useState(15);

	useTick(() => {
		// Up and down motion for the indicator image
		setY(y + Math.sin(Date.now() / 100) * 0.3);
	});

	return (
		<Container x={180} y={10}>
			<Sprite image='/ui/indicator.png' scale={2} y={y} />
			<UIText text={`${(config.game.finalDistance - distanceTraveled).toFixed(2)}ua`} x={5} y={40} anchor={0.5} />
		</Container>
	);
}
