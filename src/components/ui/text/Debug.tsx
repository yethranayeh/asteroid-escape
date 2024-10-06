import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

const style = new TextStyle({
	fontFamily: "sans-serif",
	fontSize: 16,
	fontWeight: "400",
	fill: ["#ffffff", "#00ff99"], // gradient
	wordWrap: true,
	wordWrapWidth: 200
});

export const Debug = ({ text }: { text: string }) => <Text text={text} x={0} y={0} style={style} />;
