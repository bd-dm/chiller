import { storage, StorageKeys } from "@/common";

const removeInjectedTab = async (
	tabId: chrome.tabs.Tab["id"]
): Promise<void> => {
	await storage.removeItem(
		StorageKeys.InjectedTabs,
		(prevTabId) => prevTabId !== tabId
	);
};

export { removeInjectedTab };
