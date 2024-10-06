import { Graphics } from "@pixi/react";
import { forwardRef } from "react";

function draw(g: any) {
	g.beginFill(0xff3300, 0.4);

	g.moveTo(-19, -16);
	g.lineTo(19, -16);
	g.lineTo(19, 16);
	g.lineTo(-19, 16);
	g.endFill();
}

export const Hitbox = forwardRef(({ name, x, y }: { name: string; x: number; y: number }, ref: any) => (
	<Graphics ref={ref} name={name} draw={draw} x={x} y={y} visible={false} />
));
