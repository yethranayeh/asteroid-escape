import { Stage } from "@pixi/react";

import { Ship } from "./components/Ship";
import { Background } from "./components/Background";

import { config } from "./config";

const App = () => {
	return (
		<Stage width={config.canvas.width} height={config.canvas.height} options={{ background: 0x1099bb }}>
			<Background />
			<Ship />
		</Stage>
	);
};

export default App;
