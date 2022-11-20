import { executeAssetsInjection } from "./execute-assets-injection";
import { getContentPaths } from "./get-content-paths";
import { restoreContentInjection } from "./restore-content-injection";

const onPageReady = async (
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
	try {
		await executeAssetsInjection(tabId, paths.assets);
		await restoreContentInjection();
	} catch (error) {
		console.warn("Error while injecting scripts on page ready:", error);
	}
};

export { onPageReady };
