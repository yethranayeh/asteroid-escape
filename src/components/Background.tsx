import { TilingSprite, useTick } from "@pixi/react";
import { useState } from "react";
import { config } from "../config";

export function Background() {
	const [y, setY] = useState(512 / 2);

	useTick((delta) => {
		setY((y) => y + 0.5 * delta);
	});
	return (
		<>
			<TilingSprite
				image='/bg3.png'
				tilePosition={{ x: 512 / 2, y: y }}
				width={config.canvas.width}
				height={config.canvas.height}
				zIndex={1}
			/>
			<TilingSprite
				image='/bg2.png'
				tilePosition={{ x: 512 / 2, y: y / 2 }}
				width={config.canvas.width}
				height={config.canvas.height}
				alpha={0.3}
				zIndex={1}
			/>
		</>
	);
}
