import { storage, StorageKeys } from "@/common";

import { getSavedInjectedTabs } from "./get-saved-injected-tabs";

const saveInjectedTab = async (tabId: chrome.tabs.Tab["id"]): Promise<void> => {
	const prevInjectedTabs = await getSavedInjectedTabs();

	if (!prevInjectedTabs.includes(tabId)) {
		await storage.addItem(StorageKeys.InjectedTabs, tabId);
	}
};

export { saveInjectedTab };
