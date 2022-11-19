// eslint-disable-next-line no-redeclare
import { Plugin } from "vite";
import { OutputChunk } from "rollup";
import path from "node:path";
import fs from "node:fs";
import minimatch from "minimatch";

interface Config {
	entries?: string[];
}

interface Manifest {
	scripts: string[];
	assets: string[];
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
						return {
							...prev,
							scripts: [...prev.scripts, ...imports, bundleKey],
						};
					} else {
						return {
							...prev,
							assets: [...prev.assets, bundleKey],
						};
					}
				},
				{ scripts: [], assets: [] } as Manifest
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
