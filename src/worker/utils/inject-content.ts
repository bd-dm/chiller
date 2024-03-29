import { attachDebugger } from "./attach-debugger";
import { detachDebugger } from "./detach-debugger";
import { getSavedInjectedTabs } from "./get-saved-injected-tabs";
import { removeSavedInjectedTab } from "./remove-saved-injected-tab";
import { saveInjectedTab } from "./save-injected-tab";

const injectContent = async (
	tabId: NonNullable<chrome.tabs.Tab["id"]>,
	isFromPopup = false,
): Promise<void> => {
	if (isFromPopup) {
		const prevInjectedTabs = await getSavedInjectedTabs();

		if (prevInjectedTabs.includes(tabId)) {
			// injected -> removing
			await removeSavedInjectedTab(tabId);
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
