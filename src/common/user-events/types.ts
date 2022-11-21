import { ActionTargetType } from "./enums";
import { ScriptVariables } from "../types";

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
 * Action target
 */

interface ActionTargetBase {
	type?: ActionTargetType;
}

interface SelectorActionTarget extends ActionTargetBase {
	type?: ActionTargetType.Selector;
	selector: string;
}

interface VariableActionTarget extends ActionTargetBase, UseVariable {
	type?: ActionTargetType.Variable;
}

type ActionTarget = SelectorActionTarget | VariableActionTarget;

/**
 * Exports
 */

export type {
	UserEvent,
	ActionTarget,
	SelectorActionTarget,
	VariableActionTarget,
	UserEventWithTarget,
};
