import { TextStyle } from "pixi.js";
import { Text } from "@pixi/react";
import { config } from "../../../config";

const style = new TextStyle({
	fontFamily: "Sixtyfour Convergence",
	fontSize: 32,
	fontWeight: "400",
	fill: ["#ffffff", "#00ff99"] // gradient
	// wordWrap: true,
	// wordWrapWidth: 200
});

export const GameOver = () => (
	<Text text='GAME OVER' style={style} x={config.canvas.width / 2} y={config.canvas.height / 2} anchor={0.5} />
);
