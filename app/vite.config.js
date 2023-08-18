import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: "0.0.0.0",
		proxy: {
			"/api": {
				target: "http://0.0.0.0:3010",
				changeOrigin: false,
				secure: false,
				ws: true,
			},
		},
	},
});
