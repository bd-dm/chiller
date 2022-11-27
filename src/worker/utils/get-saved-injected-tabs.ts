import { storage, StorageKeys } from "@/common";

const getSavedInjectedTabs = async (): Promise<chrome.tabs.Tab["id"][]> => {
	return (await storage.get(StorageKeys.InjectedTabs)) ?? [];
};
export { getSavedInjectedTabs };
