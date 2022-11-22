import { ScriptVariables } from "../types";
import { ActionTarget } from "./action-target";

// eslint-disable-next-line @typescript-eslint/ban-types
type DefaultParamsType = {};

/**
 * User event types
 */

type UserEvent<ParamsType = DefaultParamsType> = (
	tabId: chrome.tabs.Tab["id"],
	options: {
		params: ParamsType;
		variables?: ScriptVariables;
	}
) => Promise<void>;

type UserEventWithTarget<ParamsType = DefaultParamsType> = UserEvent<
	ParamsType & { target: ActionTarget }
>;

/**
 * Common config types
 */

interface UseVariable {
	use: string;
}

/**
 * Exports
 */

export type { UserEvent, UseVariable, UserEventWithTarget };
