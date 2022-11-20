import { getSavedInjectedTabs } from "./get-saved-injected-tabs";

const saveInjectedTab = async (tabId: chrome.tabs.Tab["id"]): Promise<void> => {
	const prevInjectedTabs = await getSavedInjectedTabs();

	if (!prevInjectedTabs.includes(tabId)) {
		await chrome.storage.local.set({
			"@chiller/contentInjectedTabs": [...prevInjectedTabs, tabId],
		});
	}
};

export { saveInjectedTab };
