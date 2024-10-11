import { TilingSprite, useTick } from "@pixi/react";
import { BlurFilter } from "pixi.js";
import { useMemo, useState } from "react";
import { useAtom } from "jotai";

import { config } from "../config";
import { shipAtom } from "../atoms/ship.atom";

export function Background() {
	const [y, setY] = useState(512 / 2);
	const [travelSpeed] = useAtom(shipAtom.travelSpeed);
	const blurFilter = useMemo(() => {
		const blur = new BlurFilter(1, 4);
		blur.blurY = 7;
		blur.blurX = 0;
		return blur;
	}, []);

	const filters = useMemo(() => {
		if (travelSpeed <= 1) {
			return { stars: [], clouds: [] };
		}

		return { stars: [blurFilter], clouds: [blurFilter] };
	}, [blurFilter, travelSpeed]);

	useTick((delta) => {
		setY((y) => y + 0.5 * delta * travelSpeed);
	});

	return (
		<>
			<TilingSprite
				image={config.baseUrl + "/bg-clouds.png"}
				tilePosition={{ x: 512 / 2, y: y }}
				width={config.canvas.width}
				height={config.canvas.height}
				zIndex={1}
				filters={filters.clouds}
			/>
			<TilingSprite
				image={config.baseUrl + "/bg-stars.png"}
				tilePosition={{ x: 512 / 2, y: y / 2 }}
				width={config.canvas.width}
				height={config.canvas.height}
				alpha={0.3}
				zIndex={1}
				filters={filters.stars}
			/>
		</>
	);
}
