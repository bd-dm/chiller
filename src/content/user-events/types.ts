type UserEvent<ParamsType> = (
	tabId: chrome.tabs.Tab["id"],
	params: ParamsType
) => void;

export type { UserEvent };
