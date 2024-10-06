import { Container, Sprite } from "@pixi/react";
import { useAtom } from "jotai";

import { shipAtom } from "../../../atoms/ship.atom";

export function ShieldUI() {
	const [isShielded] = useAtom(shipAtom.shield);

	return (
		<Container scale={1} y={15}>
			<Sprite image={`/ui/ship/shield-${isShielded ? "full" : "empty"}.png`} />
		</Container>
	);
}
