import { StorageKeys } from "../../common";

const getSavedInjectedTabs = async (): Promise<chrome.tabs.Tab["id"][]> => {
	const injectedTabs = (
		await chrome.storage.local.get(StorageKeys.InjectedTabs)
	)[StorageKeys.InjectedTabs];
	return injectedTabs ?? [];
};
export { getSavedInjectedTabs };
