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
	build: {
		emptyOutDir: true,
		outDir: "../dist",
		rollupOptions: {
			input: {
				"popup/index": path.resolve(__dirname, "./src/popup/index.html"),
				"worker/index": path.resolve(__dirname, "./src/worker/index.ts"),
				"content/index": path.resolve(__dirname, "./src/content/index.tsx"),
			},
			output: {
				preserveModules: false,
				entryFileNames: "[name].js",
			},
		},
	},
	plugins: [
		solidPlugin(),
		eslintPluginBuild,
		eslintPluginDev,
		assetsManifestPlugin({ entries: ["content/*", "assets/*.css"] }),
	],
});
