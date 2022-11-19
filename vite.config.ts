import { defineConfig, PluginOption } from "vite";
import solidPlugin from "vite-plugin-solid";
import eslintPlugin from "vite-plugin-eslint";
import { viteStaticCopy } from "vite-plugin-static-copy";

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
	plugins: [
		solidPlugin(),
		eslintPluginBuild,
		eslintPluginDev,
		viteStaticCopy({
			targets: [
				{
					src: "static/*",
					dest: ".",
				},
			],
		}),
	],
});
