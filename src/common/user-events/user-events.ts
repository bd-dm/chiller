import {
	clearInput,
	click,
	enterChar,
	enterText,
	pressKey,
	runScript,
	sleep,
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

	// With target (dynamic params)
	click: wrap(click),
	clearInput: wrap(clearInput),
	waitForElement: wrap(waitForElement),
	enterText: wrap(enterText),
	runScript: wrap(runScript),

	// Without target (static params)
	pressKey: wrap(pressKey),
	enterChar: wrap(enterChar),
	typeRandom: wrap(typeRandom),
	sleep: wrap(sleep),
};

type UserEvents = Omit<typeof userEvents, "start">;
type UserEventAction = keyof UserEvents;
type UserEventParams<Type extends UserEventAction> = Parameters<
	UserEvents[Type]
>[0]; // Comes from wrap fn

export { userEvents };

export type { UserEventAction, UserEventParams };
