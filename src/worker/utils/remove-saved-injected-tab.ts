import { storage, StorageKeys } from "common/storage";

const removeSavedInjectedTab = async (
	tabId: chrome.tabs.Tab["id"],
): Promise<void> => {
	await storage.removeItem(
		StorageKeys.InjectedTabs,
		(prevTabId) => prevTabId === tabId,
	);
};

export { removeSavedInjectedTab };
