import { Sprite } from "@pixi/react";
import { Container } from "@pixi/react-animated";
import { ComponentProps, forwardRef } from "react";
import { useAtom } from "jotai";

import { gameAtom } from "atoms/game.atom";
import { shipAtom } from "atoms/ship.atom";
import { config } from "config";

import { Hitbox } from "./Hitbox";
import { Hull } from "./Hull";
import { Engine } from "./Engine";
import { Shield } from "./Shield";

export const ShipPure = forwardRef((props: ComponentProps<typeof Container>, ref) => {
	const [isGameOver] = useAtom(gameAtom.isOver);
	const [isShielded] = useAtom(shipAtom.shield);

	return (
		<Container sortableChildren {...props}>
			<Hitbox ref={ref} />
			{!isGameOver && isShielded && <Shield />}
			<Hull />
			<Sprite image={config.baseUrl + "/ship/engine.png"} zIndex={2} anchor={0.5} />
			<Engine />
		</Container>
	);
});
