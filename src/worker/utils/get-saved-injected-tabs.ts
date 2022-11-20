const getSavedInjectedTabs = async (): Promise<chrome.tabs.Tab["id"][]> => {
	const injectedTabs = (
		await chrome.storage.local.get("@chiller/contentInjectedTabs")
	)["@chiller/contentInjectedTabs"];
	return injectedTabs ?? [];
};
export { getSavedInjectedTabs };
