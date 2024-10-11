import { Container, Sprite } from "@pixi/react";
import { useAtom } from "jotai";

import { shipAtom } from "../../../atoms/ship.atom";
import { config } from "../../../config";

export function ShieldUI() {
	const [isShielded] = useAtom(shipAtom.shield);

	return (
		<Container scale={1} y={15}>
			<Sprite image={`${config.baseUrl}/ui/ship/shield-${isShielded ? "full" : "empty"}.png`} />
		</Container>
	);
}
