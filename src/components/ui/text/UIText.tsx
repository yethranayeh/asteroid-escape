import { Text as PixiText } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { ComponentProps, PropsWithChildren } from "react";

const style = new TextStyle({
	fill: 0xffffff,
	fontSize: 12
});

export const UIText = ({ children, ...props }: PropsWithChildren<ComponentProps<typeof PixiText>>) => (
	<PixiText style={style} {...props} />
);
