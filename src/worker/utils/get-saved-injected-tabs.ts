import { storage, StorageKeys } from "common/storage";

const getSavedInjectedTabs = async (): Promise<chrome.tabs.Tab["id"][]> => {
	return (await storage.get(StorageKeys.InjectedTabs)) ?? [];
};
export { getSavedInjectedTabs };
