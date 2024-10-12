import { useTick, Text } from "@pixi/react";
import { useState } from "react";
import { config } from "../../config";
import { TextStyle } from "pixi.js";

export function Title() {
	const [spacing, setSpacing] = useState(4);
	const [weight, setWeight] = useState(300);

	useTick(() => {
		if (spacing > 1) {
			if (spacing < 1.5) {
				setSpacing(spacing - 0.002);
			} else if (spacing < 2) {
				setSpacing(spacing - 0.005);
			} else {
				setSpacing(spacing - 0.01);
			}
		}

		if (weight < 700) {
			setWeight(weight + 1);
		}
	});

	return (
		<Text
			anchor={0.5}
			x={config.canvas.width / 2}
			y={80}
			style={
				new TextStyle({
					fontFamily: config.fonts,
					fontSize: 32,
					fontWeight: weight as any,
					letterSpacing: spacing,
					fill: ["#ff7093", "#e52554"],
					stroke: "#e52554",
					strokeThickness: 1,
					dropShadow: true,
					dropShadowColor: "#e52554",
					dropShadowBlur: 2,
					dropShadowAngle: Math.PI / 6,
					dropShadowDistance: 2
				})
			}
			text='ASTEROID ESCAPE'
		/>
	);
}
