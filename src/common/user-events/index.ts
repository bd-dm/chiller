import { clearInput, click, enterChar, pressKey, sleep, type } from "./events";
import { UserEvent } from "./types";
import { typeRandom } from "./complex-events";

let _tabId: chrome.tabs.Tab["id"] = undefined;

const wrap =
	<ParamsType>(fn: UserEvent<ParamsType>) =>
	(params: ParamsType) =>
		fn(_tabId, params);

const userEvents = {
	start: (tabId: chrome.tabs.Tab["id"]) => {
		_tabId = tabId;
	},

	click: wrap(click),
	pressKey: wrap(pressKey),
	enterChar: wrap(enterChar),
	type: wrap(type),
	cleanInput: wrap(clearInput),

	typeRandom: wrap(typeRandom),
	sleep: wrap(sleep),
};

type UserEvents = Omit<typeof userEvents, "start">;
type UserEventAction = keyof UserEvents;
type UserEventParams<Type extends UserEventAction> = Parameters<
	UserEvents[Type]
>[0];

export { userEvents };

export type { UserEventParams, UserEventAction };
