import { defineConfig, PluginOption } from "vite";
import solidPlugin from "vite-plugin-solid";
import eslintPlugin from "vite-plugin-eslint";
import path from "node:path";
import { assetsManifestPlugin } from "./plugins";

const eslintPluginBuild: PluginOption = {
	...eslintPlugin(),
	apply: "build",
};

const eslintPluginDev: PluginOption = {
	...eslintPlugin({
		failOnWarning: false,
		failOnError: false,
	}),
	apply: "serve",
	enforce: "post",
};

export default defineConfig({
	root: "./src",
	css: {
		modules: {
			localsConvention: "dashes",
		},
	},
	build: {
		minify: false,
		sourcemap: true,
		emptyOutDir: true,
		outDir: "../dist",
		rollupOptions: {
			input: {
				"popup/index": path.resolve(__dirname, "./src/popup/index.html"),
				"worker/index": path.resolve(__dirname, "./src/worker/index.ts"),
				"content/index": path.resolve(__dirname, "./src/content/index.ts"),
			},
			output: {
				assetFileNames: "styles/[name]-[hash][extname]",
				chunkFileNames: "chunks/[name]-[hash].js",
				entryFileNames: "[name].js",
				preserveModules: false,
			},
		},
	},
	plugins: [
		solidPlugin(),
		eslintPluginBuild,
		eslintPluginDev,
		assetsManifestPlugin({ entries: ["styles/*.css"] }),
	],
});
