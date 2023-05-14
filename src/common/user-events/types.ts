// eslint-disable-next-line @typescript-eslint/ban-types
type DefaultParamsType = {};

/**
 * User event types
 */

type UserEventVariable = string;
type UserEventVariables = Record<string, UserEventVariable>;

type UserEvent<ParamsType = DefaultParamsType> = (
	tabId: chrome.tabs.Tab["id"],
	options: {
		params: ParamsType;
		variables?: UserEventVariables;
	}
) => Promise<void>;

/**
 * Target element types
 */

type UserEventWithTarget<
	ParamsType = DefaultParamsType,
	TargetType =
		| ActionDynamicParamWithText
		| ActionDynamicParamWithSelector
		| ActionDynamicParamWithVariable
> = UserEvent<
	ParamsType & {
		target: TargetType;
	}
>;

interface TargetElementData<ElementType extends HTMLElement> {
	element: ElementType;
	iframe?: HTMLIFrameElement;
}

type GetTargetElementFn = <ElementType extends HTMLElement>(
	target: ActionDynamicParam,
	variables?: UserEventVariables
) => TargetElementData<ElementType>;

/**
 * Action params
 */

enum ActionDynamicParamType {
	Variable = "variable",
	Text = "text",
	Selector = "selector",
	Script = "script",
}

interface ActionDynamicParamEmpty {
	type: null;
}

interface ActionDynamicParamWithVariable {
	type: ActionDynamicParamType.Variable;
	use: string;
}

interface ActionDynamicParamWithText {
	type: ActionDynamicParamType.Text;
	text: string;
}

interface ActionDynamicParamWithSelector {
	type: ActionDynamicParamType.Selector;
	selector: string;
}

interface ActionDynamicParamWithScript {
	type: ActionDynamicParamType.Script;
	script: string;
}

type ActionDynamicParam =
	| ActionDynamicParamEmpty
	| ActionDynamicParamWithVariable
	| ActionDynamicParamWithText
	| ActionDynamicParamWithSelector
	| ActionDynamicParamWithScript;

/**
 * Exports
 */

export type {
	ActionDynamicParam,
	ActionDynamicParamWithScript,
	ActionDynamicParamWithSelector,
	ActionDynamicParamWithText,
	ActionDynamicParamWithVariable,
	DefaultParamsType,
	GetTargetElementFn,
	TargetElementData,
	UserEvent,
	UserEventVariables,
	UserEventWithTarget,
};

export { ActionDynamicParamType };
