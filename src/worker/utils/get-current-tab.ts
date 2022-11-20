const getCurrentTab = async (): Promise<chrome.tabs.Tab | undefined> => {
	const queryOptions = { active: true, currentWindow: true };
	const [tab] = await chrome.tabs.query(queryOptions);

	return tab;
};

export { getCurrentTab };
