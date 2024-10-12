import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "https://www.aktasalper.com/asteroid-escape/",
	resolve: {
		alias: {
			src: "/src",
			components: "/src/components",
			atoms: "/src/atoms",
			stages: "/src/stages",
			utils: "/src/utils",
			config: "/src/config.ts"
		}
	}
});
