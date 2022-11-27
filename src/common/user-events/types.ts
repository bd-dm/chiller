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

type UserEventWithTarget<ParamsType = DefaultParamsType> = UserEvent<
	ParamsType & {
		target: ActionDynamicParamWithSelector | ActionDynamicParamWithVariable;
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

type ActionDynamicParam =
	| ActionDynamicParamEmpty
	| ActionDynamicParamWithVariable
	| ActionDynamicParamWithText
	| ActionDynamicParamWithSelector;

/**
 * Exports
 */

export type {
	ActionDynamicParam,
	ActionDynamicParamWithSelector,
	ActionDynamicParamWithText,
	ActionDynamicParamWithVariable,
	GetTargetElementFn,
	TargetElementData,
	UserEvent,
	UserEventVariables,
	UserEventWithTarget,
};

export { ActionDynamicParamType };
