import { onMessage } from "../common";
import { MessageType } from "../common/message-carrier/enums";

interface AssetsManifest {
	scripts: string[];
	assets: string[];
}

const injectAssets = (assetPaths: string[]): void => {
	assetPaths.forEach((assetPath) => {
		const extension = assetPath.split(".").pop();
		const assetUrl = chrome.runtime.getURL(assetPath);

		switch (extension) {
			case "css": {
				const element = document.createElement("link");
				element.href = assetUrl;
				element.type = "text/css";
				element.rel = "stylesheet";
				document.head.append(element);
				break;
			}
			case "js": {
				const element = document.createElement("script");
				element.type = "module";
				element.src = assetUrl;
				document.head.append(element);
				break;
			}
		}
	});
};

const executeAssetsInjection = async (
	tabId: NonNullable<chrome.tabs.Tab["id"]>,
	assetPaths: string[]
) =>
	chrome.scripting.executeScript({
		target: { tabId },
		func: injectAssets,
		args: [assetPaths],
	});

const getPaths = async (): Promise<AssetsManifest> => {
	const assetsManifestUrl = chrome.runtime.getURL("assets-manifest.json");
	return fetch(assetsManifestUrl).then((response) => response.json());
};

const injectContent = async (
	tabId: number,
	changeInfo: chrome.tabs.TabChangeInfo,
	tab: chrome.tabs.Tab
): Promise<void> => {
	if (changeInfo.status !== "complete") {
		return;
	}

	if (tab.url?.startsWith("chrome://")) {
		return;
	}

	const paths = await getPaths();
	await executeAssetsInjection(tabId, paths.assets);
};

chrome.tabs.onUpdated.addListener(injectContent);
onMessage(MessageType.GetCurrentTab, (message, sender, sendResponse) => {
	const queryOptions = { active: true, currentWindow: true };
	chrome.tabs.query(queryOptions, ([tab]) => {
		if (!tab) {
			return;
		}

		sendResponse(tab);
	});
	return true;
});

export {};
