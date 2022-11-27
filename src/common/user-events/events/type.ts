import {
	ActionDynamicParamWithText,
	ActionDynamicParamWithVariable,
	UserEvent,
} from "../types";
import { getActionParamValue } from "../utils";
import { enterChar } from "./enter-char";

interface TypeParams {
	text: ActionDynamicParamWithVariable | ActionDynamicParamWithText;
}

const type: UserEvent<TypeParams> = async (
	tabId,
	{ params: { text }, variables }
): Promise<void> => {
	const textValue = getActionParamValue(text, variables);

	for (let i = 0; i < textValue.length; i++) {
		await enterChar(tabId, { params: { char: textValue[i] } });
	}
};

export { type };
export type { TypeParams };
