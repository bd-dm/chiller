// eslint-disable-next-line no-redeclare
import { Plugin } from "vite";
import { OutputChunk } from "rollup";
import path from "node:path";
import fs from "node:fs";

interface Config {
	entries?: string[];
}

const assetsManifestPlugin = ({ entries }: Config): Plugin => {
	return {
		name: "assetsManifest",
		enforce: "post",
		writeBundle: ({ dir }, bundle) => {
			if (!dir) {
				return;
			}

			Object.entries(bundle).forEach(async ([bundleKey, bundleData]) => {
				// If we have entries config, parse only bundles mentioned there
				if (entries) {
					const shouldParseEntry = entries.some((entry) =>
						bundleKey.startsWith(entry)
					);
					if (!shouldParseEntry) {
						return;
					}
				}

				const chunk = bundleData as OutputChunk;

				// if not an entry bundle, skip it
				const { isEntry } = chunk;
				if (!isEntry) {
					return;
				}

				const { imports } = chunk;
				const manifest = JSON.stringify(imports);
				await fs.promises.writeFile(
					path.resolve(dir, "assets-manifest.json"),
					manifest
				);
			});
		},
	};
};

export { assetsManifestPlugin };
