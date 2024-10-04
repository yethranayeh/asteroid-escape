import { Stage } from "@pixi/react";
import { Ship } from "./components/Ship";
import { config } from "./config";

const App = () => {
	return (
		<Stage width={config.canvas.width} height={config.canvas.height} options={{ background: 0x1099bb }}>
			<Ship />
		</Stage>
	);
};

export default App;
