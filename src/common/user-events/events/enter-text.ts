import {
	ActionDynamicParamWithText,
	ActionDynamicParamWithVariable,
	DefaultParamsType,
	UserEventWithTarget,
} from "../types";
import { getActionParamValue } from "../utils";
import { enterChar } from "./enter-char";

const enterText: UserEventWithTarget<
	DefaultParamsType,
	ActionDynamicParamWithVariable | ActionDynamicParamWithText
> = async (tabId, { params: { target }, variables }): Promise<void> => {
	const textValue = getActionParamValue(target, variables);

	for (let i = 0; i < textValue.length; i++) {
		await enterChar(tabId, { params: { char: textValue[i] } });
	}
};

export { enterText };
