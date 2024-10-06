import { Container } from "@pixi/react";

import { Info } from "./text/Info";
import { Health } from "./ship/Health";

export function UI() {
	return (
		<Container x={10} y={10}>
			<Health />
			<Info />
		</Container>
	);
}
