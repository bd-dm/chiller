import { getSavedInjectedTabs } from "./get-saved-injected-tabs";

const removeInjectedTab = async (
	tabId: chrome.tabs.Tab["id"]
): Promise<void> => {
	const prevInjectedTabs = await getSavedInjectedTabs();

	await chrome.storage.local.set({
		"@chiller/contentInjectedTabs": prevInjectedTabs.filter(
			(prevTabId) => prevTabId !== tabId
		),
	});
};

export { removeInjectedTab };
