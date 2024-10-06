import { Graphics } from "@pixi/react";
import { forwardRef } from "react";

function draw(g: any) {
	g.beginFill(0x07f72f, 0.4);

	g.moveTo(-15, -13);
	g.lineTo(15, -13);
	g.lineTo(15, 13);
	g.lineTo(-15, 13);
	g.endFill();
}

export const Hitbox = forwardRef((_, ref: any) => <Graphics ref={ref} draw={draw} visible={false} />);
