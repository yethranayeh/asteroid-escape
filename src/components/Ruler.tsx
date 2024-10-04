import { Graphics } from "@pixi/react";

function draw(g: any) {
	g.beginFill(0xff3300, 0.4);
	g.lineStyle(2, 0xffd900, 1);

	g.moveTo(0, 0);
	g.lineTo(48, 0);
	g.lineTo(0, 48);
	g.lineTo(0, 0);
	g.endFill();
}

export const Ruler = () => <Graphics zIndex={10} draw={draw} />;
