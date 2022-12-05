import {
	clearInput,
	click,
	enterChar,
	pressKey,
	runScript,
	sleep,
	type,
	typeRandom,
	waitForElement,
} from "./events";
import { UserEvent, UserEventVariables } from "./types";

let _tabId: chrome.tabs.Tab["id"] = undefined;

const wrap =
	<ParamsType>(fn: UserEvent<ParamsType>) =>
	(params: ParamsType, variables: UserEventVariables) =>
		fn(_tabId, { params, variables });

const userEvents = {
	start: (tabId: chrome.tabs.Tab["id"]) => {
		_tabId = tabId;
	},

	click: wrap(click),
	pressKey: wrap(pressKey),
	enterChar: wrap(enterChar),
	type: wrap(type),
	clearInput: wrap(clearInput),
	typeRandom: wrap(typeRandom),
	sleep: wrap(sleep),
	waitForElement: wrap(waitForElement),
	runScript: wrap(runScript),
};

type UserEvents = Omit<typeof userEvents, "start">;
type UserEventAction = keyof UserEvents;
type UserEventParams<Type extends UserEventAction> = Parameters<
	UserEvents[Type]
>[0]; // Comes from wrap fn

export { userEvents };

export type { UserEventAction, UserEventParams };
