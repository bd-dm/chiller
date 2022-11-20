interface AssetsManifest {
	scripts: string[];
	assets: string[];
}

const getContentPaths = async (): Promise<AssetsManifest> => {
	const assetsManifestUrl = chrome.runtime.getURL("assets-manifest.json");
	return fetch(assetsManifestUrl).then((response) => response.json());
};

export { getContentPaths };
