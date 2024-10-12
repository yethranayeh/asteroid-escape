import { Container, Text, useTick } from "@pixi/react";
import { Container as AnimatedContainer } from "@pixi/react-animated";
import { TextStyle } from "pixi.js";
import { Spring } from "react-spring";
import { useState } from "react";

import { ShipPure } from "components/Ship/ShipPure";
import { Planet } from "components/Planet";

import { config } from "config";

const style = new TextStyle({
	fontFamily: "monospace",
	fill: 0xffffff,
	fontSize: 18,
	fontWeight: "400",
	wordWrap: true,
	wordWrapWidth: 270
});

const EndingText = () => (
	<Text
		text={`
		We made it.

		The stars are behind us, and before us lies a new world, a new beginning.

		For Earth.
		For humanity.
		For hope.`}
		x={60}
		style={style}
	/>
);

export function EndingScene() {
	const [isDescending, setIsDescending] = useState(false);
	const [scale, setScale] = useState(1);
	const [isTextVisible, setIsTextVisible] = useState(false);

	useTick(() => {
		const currentTime = Math.floor(performance.now() / 1000);

		if (currentTime > 0 && currentTime % 4 === 0) {
			setIsDescending(true);
			setIsTextVisible(true);
		}

		if (isDescending) {
			if (scale > 0.2) {
				setScale(scale - 0.0005);
			}
		}
	});
	return (
		<Container>
			{isTextVisible && (
				<Spring from={{ x: 0, y: 0 }} to={{ x: 0, y: 100 }} config={{ tension: 20, friction: 25 }}>
					{(props) => (
						<AnimatedContainer {...props}>
							<EndingText />
						</AnimatedContainer>
					)}
				</Spring>
			)}
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
