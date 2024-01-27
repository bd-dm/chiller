import { injectAssets } from "./inject-assets";

const executeAssetsInjection = async (
	tabId: NonNullable<chrome.tabs.Tab["id"]>,
	assetPaths: string[],
) =>
	chrome.scripting.executeScript({
		target: { tabId },
		func: injectAssets,
		args: [assetPaths],
	});

export { executeAssetsInjection };
