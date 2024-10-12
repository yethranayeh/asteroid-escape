import { Container } from "@pixi/react-animated";
import { Spring } from "react-spring";

import { config } from "config";

import { KeyboardControls } from "./KeyboardControls";
import { PlayButton } from "components/ui/buttons/PlayButton";

export const Controls = () => (
	<Spring
		from={{ x: config.canvas.width / 2, y: config.canvas.height + 100 }}
		to={{ x: config.canvas.width / 2, y: 630 }}
		config={{ tension: 40, friction: 25 }}>
		{(props) => (
			<Container {...props}>
				<KeyboardControls />

				<PlayButton />
			</Container>
		)}
	</Spring>
);
