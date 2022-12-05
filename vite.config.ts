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

export default defineConfig(({ mode }) => {
	const isDev = mode === "development";

	return {
		css: {
			modules: {
				localsConvention: "dashes",
			},
		},
		build: {
			minify: !isDev,
			sourcemap: isDev,
			emptyOutDir: true,
			outDir: "dist",
			rollupOptions: {
				input: [
					path.resolve(__dirname, "./src/devtools/devtools.html"),
					path.resolve(__dirname, "./src/devtools/panel.html"),
					path.resolve(__dirname, "./src/popup/popup.html"),
					path.resolve(__dirname, "./src/worker/worker.ts"),
					path.resolve(__dirname, "./src/content/content.ts"),
				],
				output: {
					preserveModules: false,
					entryFileNames: "entries/[name].js",
					assetFileNames: "styles/[name]-[hash][extname]",
					chunkFileNames: "chunks/[name]-[hash].js",
				},
				preserveEntrySignatures: "exports-only",
			},
			modulePreload: false,
		},
		plugins: [
			solidPlugin(),
			tsconfigPaths(),
			eslintPluginBuild,
			eslintPluginDev,
			assetsManifestPlugin({ entries: ["styles/*.css"] }),
		],
	};
});
