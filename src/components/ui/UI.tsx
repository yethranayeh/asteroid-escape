import { Container } from "@pixi/react";

import { Health } from "./ship/Health";
import { ShieldUI } from "./ship/ShieldUI";
import { DistanceToGoal } from "./text/DistanceToGoal";

export function UI() {
	return (
		<Container x={10} y={10}>
			<Health />
			<ShieldUI />
			<DistanceToGoal />
		</Container>
	);
}
