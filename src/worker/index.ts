const injectScripts = (scriptPaths: string[]): void => {
	scriptPaths.forEach((scriptPath) => {
		const element = document.createElement("script");
		element.type = "module";
		element.src = chrome.runtime.getURL(scriptPath);
		document.head.append(element);
	});
};

const executeScriptsInjection = async (
	tabId: NonNullable<chrome.tabs.Tab["id"]>,
	scriptPaths: string[]
) =>
	chrome.scripting.executeScript({
		target: { tabId },
		func: injectScripts,
		args: [scriptPaths],
	});

const getAssetPaths = async (): Promise<string[]> => {
	const assetsManifestUrl = chrome.runtime.getURL("assets-manifest.json");
	return fetch(assetsManifestUrl).then((response) => response.json());
};

const injectContent = async (
	tabId: number,
	changeInfo: chrome.tabs.TabChangeInfo
): Promise<void> => {
	if (changeInfo.status !== "complete") {
		return;
	}

	const assetsPaths = await getAssetPaths();
	const scriptsPaths = [...assetsPaths, "content/index.js"];

	await executeScriptsInjection(tabId, scriptsPaths);
};

chrome.tabs.onUpdated.addListener(injectContent);

export {};
