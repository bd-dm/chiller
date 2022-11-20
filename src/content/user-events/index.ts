import { click } from "./events";
import { UserEvent } from "./types";

let _tabId: chrome.tabs.Tab["id"] = undefined;

const wrap =
	<ParamsType>(fn: UserEvent<ParamsType>) =>
	(params: ParamsType) => {
		fn(_tabId, params);
	};

const userEvents = {
	start: (tabId: chrome.tabs.Tab["id"]) => {
		_tabId = tabId;
	},

	click: wrap(click),
};

export { userEvents };
