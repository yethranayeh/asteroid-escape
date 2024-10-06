import { Container, useTick } from "@pixi/react";
import { Container as AnimatedContainer } from "@pixi/react-animated";
import { Spring } from "react-spring";

import { config } from "./config";
import { ShipPure } from "./components/Ship/ShipPure";
import { Planet } from "./components/Planet";
import { useState } from "react";

export function EndingScene() {
	const [isDescending, setIsDescending] = useState(false);
	const [scale, setScale] = useState(1);
	useTick(() => {
		const currentTime = Math.floor(performance.now() / 1000);

		if (currentTime > 0 && currentTime % 4 === 0) {
			setIsDescending(true);
		}

		if (isDescending) {
			if (scale > 0.2) {
				setScale(scale - 0.0005);
			}
		}
	});
	return (
		<Container>
			<Spring
				from={{ x: config.canvas.width / 2, y: 0 }}
				to={{ x: config.canvas.width / 2, y: config.canvas.height / 2 }}
				config={{ tension: 20, friction: 25 }}>
				{(props) => (
					<AnimatedContainer {...props}>
						<Planet />
					</AnimatedContainer>
				)}
			</Spring>

			<Spring
				from={{ x: config.canvas.width / 2, y: 750 }}
				to={{ x: config.canvas.width / 2, y: config.canvas.height / 2 }}
				config={{ tension: 40, friction: 19 }}>
				{(props) => <ShipPure {...props} scale={scale} />}
			</Spring>
		</Container>
	);
}
