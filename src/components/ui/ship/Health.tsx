import { Container, Sprite } from "@pixi/react";
import { useAtom } from "jotai";
import { Graphics, Texture } from "pixi.js";
import { useMemo } from "react";

import { shipAtom } from "../../../atoms/ship.atom";
import { UIText } from "../text/UIText";
import { config } from "../../../config";

export function Health() {
	const [health] = useAtom(shipAtom.health);
	const mask = useMemo(() => {
		const g = new Graphics();

		g.beginTextureFill({
			texture: Texture.WHITE,
			color: 0xff0000,
			alpha: 1
		});
		g.drawRect(0, 0, health, 20);
		g.endFill();

		return g;
	}, [health]);

	const healthText = health < 0 ? 0 : Math.round(health);

	return (
		<Container>
			<Sprite image={config.baseUrl + "/ui/ship/health-bar.png"} scale={1.6} />
			<Sprite image={config.baseUrl + "/ui/ship/health.png"} scale={1.6} x={2} y={2} mask={mask} />
			<UIText text={`${healthText}/100`} x={77} y={-4} />
		</Container>
	);
}
