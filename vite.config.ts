import path from "node:path";

import { defineConfig, PluginOption } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import solidPlugin from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

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
		minify: true,
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
		tsconfigPaths({ root: "../" }),
		eslintPluginBuild,
		eslintPluginDev,
		assetsManifestPlugin({ entries: ["styles/*.css"] }),
	],
});
