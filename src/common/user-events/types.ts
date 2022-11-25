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

type UserEventTargetParams = { target: ActionTarget };

type UserEventWithTarget<ParamsType = DefaultParamsType> = UserEvent<
	ParamsType & UserEventTargetParams
>;

/**
 * Common config types
 */

enum ActionParamType {
	Variable = "variable",
	Text = "text",
	Selector = "selector",
}

interface UseVariable {
	use: string;
}

interface ActionParamEmpty {
	type: null;
}

interface ActionParamWithVariable extends UseVariable {
	type: ActionParamType.Variable;
}

interface ActionParamWithText {
	type: ActionParamType.Text;
	text: string;
}

interface ActionParamWithSelector {
	type: ActionParamType.Selector;
	selector: string;
}

type ActionParam =
	| ActionParamEmpty
	| ActionParamWithVariable
	| ActionParamWithText
	| ActionParamWithSelector;

/**
 * Exports
 */

export type {
	UserEvent,
	UseVariable,
	ActionParamWithVariable,
	ActionParamWithText,
	ActionParamWithSelector,
	ActionParam,
	UserEventTargetParams,
	UserEventWithTarget,
};

export { ActionParamType };
