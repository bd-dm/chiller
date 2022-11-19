// eslint-disable-next-line no-redeclare
import { Plugin } from "vite";
import { OutputChunk } from "rollup";
import path from "node:path";
import fs from "node:fs";
import minimatch from "minimatch";

interface Config {
	entries?: string[];
}

const assetsManifestPlugin = ({ entries }: Config): Plugin => {
	return {
		name: "assetsManifest",
		enforce: "post",
		writeBundle: async ({ dir }, bundle) => {
			if (!dir) {
				return;
			}

			const assetPaths = Object.entries(bundle).reduce(
				(prev, [bundleKey, bundleData]) => {
					// If we have entries config, parse only bundles mentioned there
					if (entries) {
						const shouldParseEntry = entries.some((entryGlob) =>
							minimatch(bundleKey, entryGlob)
						);
						if (!shouldParseEntry) {
							return prev;
						}
					}

					if ((bundleData as OutputChunk).isEntry) {
						const { imports } = bundleData as OutputChunk;
						return [...prev, ...imports, bundleKey];
					} else {
						return [...prev, bundleKey];
					}
				},
				[] as string[]
			);

			const manifest = JSON.stringify(assetPaths);
			await fs.promises.writeFile(
				path.resolve(dir, "assets-manifest.json"),
				manifest
			);
		},
	};
};

export { assetsManifestPlugin };
