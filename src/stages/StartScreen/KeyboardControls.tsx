import { Container, Sprite, Text } from "@pixi/react";
import { config } from "../../config";
import { TextStyle } from "pixi.js";

const style = new TextStyle({
	fontFamily: "monospace",
	fill: 0xffffff,
	fontSize: 14,
	fontWeight: "600",
	wordWrap: true,
	wordWrapWidth: config.canvas.width - 24
});

export const KeyboardControls = () => (
	<Container>
		<Container y={-10}>
			<Text anchor={0.5} style={style} text='Boost' y={-30} />
			<Sprite image={`${config.baseUrl}/ui/keyboard/w.png`} scale={0.8} anchor={0.5} />
		</Container>

		<Container x={-40}>
			<Text anchor={0.5} style={style} text='Left' x={-40} />
			<Sprite image={`${config.baseUrl}/ui/keyboard/a.png`} scale={0.8} anchor={0.5} />
		</Container>

		<Container x={40}>
			<Text anchor={0.5} style={style} text='Right' x={40} />
			<Sprite image={`${config.baseUrl}/ui/keyboard/d.png`} scale={0.8} anchor={0.5} />
		</Container>
	</Container>
);
