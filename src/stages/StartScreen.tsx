import { TextStyle } from "pixi.js";
import { Sprite, Text } from "@pixi/react";

import { PlayButton } from "../components/ui/buttons/PlayButton";

import { config } from "../config";

const style = new TextStyle({
	fontFamily: config.fonts,
	fill: 0xffffff,
	fontSize: 18,
	fontWeight: "400",
	wordWrap: true,
	wordWrapWidth: config.canvas.width - 24
});

const controls = new TextStyle({
	fontFamily: "monospace",
	fill: 0xffffff,
	fontSize: 14,
	fontWeight: "600",
	wordWrap: true,
	wordWrapWidth: config.canvas.width - 24
});

export function StartScreen() {
	return (
		<>
			<Text
				anchor={0.5}
				x={config.canvas.width / 2}
				y={config.canvas.height / 2 - 80}
				style={style}
				text={`In the distant future, the Earth has become uninhabitable, and humanity is on the brink of extinction.

			The last remaining survivors have boarded a small but advanced spaceship, The Glider, on a desperate mission to reach a distant, habitable planet known only as Elysium.

			This planet, though distant and shrouded in mystery, is the only hope for humanity's survival.

			However, the journey is perilous. The ship must navigate through a treacherous asteroid belt before reaching safety.`}
			/>

			<Text anchor={0.5} x={config.canvas.width / 2} y={540} style={controls} text='Boost' />
			<Sprite
				image={`${config.baseUrl}/ui/keyboard/w.png`}
				x={config.canvas.width / 2}
				y={570}
				scale={0.8}
				anchor={0.5}
			/>

			<Text anchor={0.5} x={100} y={610} style={controls} text='Left' />
			<Sprite image={`${config.baseUrl}/ui/keyboard/a.png`} x={140} y={610} scale={0.8} anchor={0.5} />

			<Text anchor={0.5} x={260} y={610} style={controls} text='Right' />
			<Sprite image={`${config.baseUrl}/ui/keyboard/d.png`} x={220} y={610} scale={0.8} anchor={0.5} />

			<PlayButton />
		</>
	);
}
