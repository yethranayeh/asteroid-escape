import { useEffect, useState } from "react";

import { Title } from "./Title";
import { Premise } from "./Premise";
import { Controls } from "./Controls";

export function StartScreen() {
	const [reRendered, setReRendered] = useState(false);
	const [showPremise, setShowPremise] = useState(false);
	const [showControls, setShowControls] = useState(false);

	// Force re-render to apply fonts. I don't know why it does not apply them on initial render.
	useEffect(() => {
		const timeout = setTimeout(() => setReRendered(true), 1000);
		if (reRendered === true) {
			clearTimeout(timeout);
		}

		return () => clearTimeout(timeout);
	}, [reRendered, setReRendered]);

	useEffect(() => {
		const timeout = setTimeout(() => setShowPremise(true), 1500);

		return () => clearTimeout(timeout);
	}, [setShowPremise]);

	useEffect(() => {
		const timeout = setTimeout(() => setShowControls(true), 5000);

		return () => clearTimeout(timeout);
	}, [setShowControls]);

	return (
		<>
			<Title />

			{showPremise && <Premise />}

			{showControls && <Controls />}
		</>
	);
}
