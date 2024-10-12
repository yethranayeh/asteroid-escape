import { TextStyle } from "pixi.js";
import { Text } from "@pixi/react";
import { config } from "../../../config";

const style = new TextStyle({
	fontFamily: config.fonts,
	fontSize: 32,
	fontWeight: "700",
	fill: ["#ffffff"]
});

export const GameOver = () => (
	<Text text='GAME OVER' style={style} x={config.canvas.width / 2} y={config.canvas.height / 2} anchor={0.5} />
);
