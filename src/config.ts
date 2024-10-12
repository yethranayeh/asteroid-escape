export const config = {
	baseUrl: import.meta.env.DEV ? "./" : "https://www.aktasalper.com/asteroid-escape",
	fonts: ["Space Grotesk Variable", "Arial"],
	canvas: {
		width: 360,
		height: 800
	},
	game: {
		finalDistance: 10
	}
};
