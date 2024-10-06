import { useAtom } from "jotai";

import { shipAtom } from "../../../atoms/ship.atom";
import { UIText } from "./UIText";

export function Info() {
	const [distanceTraveled] = useAtom(shipAtom.distanceTraveled);
	return <UIText text={`Distance: ${distanceTraveled.toFixed(2)}au`} x={0} y={50} />;
}
