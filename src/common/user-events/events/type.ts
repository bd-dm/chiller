import { ActionParam, UserEvent } from "../types";
import { enterChar } from "./enter-char";
import { getActionParamValue } from "../utils";

interface TypeParams {
	text: ActionParam;
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
