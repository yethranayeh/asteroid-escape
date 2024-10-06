import { useAtom } from "jotai";
import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

import { shipAtom } from "../../../atoms/ship.atom";

const style = new TextStyle({
	fill: 0xffffff,
	fontSize: 12
});

export default function Info() {
	const [distanceTraveled] = useAtom(shipAtom.distanceTraveled);
	return <Text text={`Distance: ${distanceTraveled.toFixed(2)}au`} x={0} y={0} style={style} />;
}
