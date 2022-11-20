import { attachDebugger } from "./attach-debugger";
import { saveInjectedTab } from "./save-injected-tab";
import { getSavedInjectedTabs } from "./get-saved-injected-tabs";
import { detachDebugger } from "./detach-debugger";
import { removeInjectedTab } from "./remove-injected-tab";

const injectContent = async (
	tabId: NonNullable<chrome.tabs.Tab["id"]>,
	isFromPopup = false
): Promise<void> => {
	if (isFromPopup) {
		const prevInjectedTabs = await getSavedInjectedTabs();

		if (prevInjectedTabs.includes(tabId)) {
			// injected -> removing
			await removeInjectedTab(tabId);
			await chrome.scripting.executeScript({
				target: { tabId: tabId },
				files: ["clean-content.js"],
			});
			try {
				await detachDebugger({ tabId });
			} catch (error) {
				console.warn(error);
			}
			return;
		}
	}

	await chrome.scripting.executeScript({
		target: { tabId: tabId },
		files: ["inject-content.js"],
	});
	await saveInjectedTab(tabId);
	try {
		await attachDebugger({ tabId: tabId });
	} catch (error) {
		console.warn(error);
	}
};

export { injectContent };
