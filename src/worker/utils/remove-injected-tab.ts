import { getSavedInjectedTabs } from "./get-saved-injected-tabs";
import { StorageKeys } from "../../common";

const removeInjectedTab = async (
	tabId: chrome.tabs.Tab["id"]
): Promise<void> => {
	const prevInjectedTabs = await getSavedInjectedTabs();

	await chrome.storage.local.set({
		[StorageKeys.InjectedTabs]: prevInjectedTabs.filter(
			(prevTabId) => prevTabId !== tabId
		),
	});
};

export { removeInjectedTab };
