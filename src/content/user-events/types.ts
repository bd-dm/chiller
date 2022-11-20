type UserEvent<ParamsType> = (
	tabId: chrome.tabs.Tab["id"],
	params: ParamsType
) => Promise<void>;

export type { UserEvent };
