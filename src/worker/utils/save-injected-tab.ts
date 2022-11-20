import { getSavedInjectedTabs } from "./get-saved-injected-tabs";
import { StorageKeys } from "../../common";

const saveInjectedTab = async (tabId: chrome.tabs.Tab["id"]): Promise<void> => {
	const prevInjectedTabs = await getSavedInjectedTabs();

	if (!prevInjectedTabs.includes(tabId)) {
		await chrome.storage.local.set({
			[StorageKeys.InjectedTabs]: [...prevInjectedTabs, tabId],
		});
	}
};

export { saveInjectedTab };
