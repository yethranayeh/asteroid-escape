import { useEffect, useState } from "react";
import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { config } from "../../config";
import { Container } from "@pixi/react-animated";
import { Spring } from "react-spring";

const style = new TextStyle({
	fontFamily: config.fonts,
	fill: 0xffffff,
	fontSize: 18,
	fontWeight: "400",
	wordWrap: true,
	wordWrapWidth: config.canvas.width - 24
});

const paragraphs = [
	{
		t: "\t\tIn the distant future, the Earth has become uninhabitable, and humanity is on the brink of extinction.",
		y: 40 + 100
	},
	{
		t: "\t\tThe last remaining survivors have boarded a small but advanced spaceship, The Glider, on a desperate mission to reach a distant, habitable planet known only as Elysium.",
		y: 40 + 180
	},
	{
		t: "\t\tThis planet, though distant and shrouded in mystery, is the only hope for humanity's survival.",
		y: 40 + 310
	},
	{
		t: "\t\tHowever, the journey is perilous. The ship must navigate through a treacherous asteroid belt before reaching safety.",
		y: 40 + 390
	}
];

export function Premise() {
	const [alpha, setAlpha] = useState(0);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setAlpha(alpha + 0.01);
		}, 25);

		if (alpha >= 1) {
			clearTimeout(timeout);
		}

		return () => clearTimeout(timeout);
	}, [alpha, setAlpha]);

	return (
		<>
			{paragraphs.map((paragraph, index) => (
				<Spring
					key={paragraph.y * index}
					from={{ x: 15, y: paragraph.y * 2 }}
					to={{ x: 15, y: paragraph.y }}
					config={{ tension: (50 + index * 2) / (index + 1 + 0.2), friction: 25 - index * 2 }}>
					{(props) => (
						<Container {...props}>
							<Text key={index} text={paragraph.t} style={style} alpha={alpha} />
						</Container>
					)}
				</Spring>
			))}
		</>
	);
}
