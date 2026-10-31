import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
	base: "/2026-media/",
	plugins: [react()],
	build: {
		// Lightning CSS drops unprefixed backdrop-filter when a -webkit-
		// fallback is present, which removes the frosted-glass blur.
		cssMinify: "esbuild",
	},
})
