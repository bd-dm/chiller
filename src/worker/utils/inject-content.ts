import { executeAssetsInjection } from "./execute-assets-injection";
import { getContentPaths } from "./get-content-paths";

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

	const paths = await getContentPaths();
	await executeAssetsInjection(tabId, paths.assets);
};

export { injectContent };
