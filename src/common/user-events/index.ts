import {
	clearInput,
	click,
	enterChar,
	pressKey,
	sleep,
	type,
	waitForElement,
} from "./events";
import { UserEvent } from "./types";
import { typeRandom } from "./complex-events";
import { ScriptVariables } from "../types";

let _tabId: chrome.tabs.Tab["id"] = undefined;

const wrap =
	<ParamsType>(fn: UserEvent<ParamsType>) =>
	(params: ParamsType, variables: ScriptVariables) =>
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
};

type UserEvents = Omit<typeof userEvents, "start">;
type UserEventAction = keyof UserEvents;
type UserEventParams<Type extends UserEventAction> = Parameters<
	UserEvents[Type]
>[0];

export { userEvents };

export type { UserEventParams, UserEventAction };
