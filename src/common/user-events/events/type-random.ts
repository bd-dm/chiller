import { ActionDynamicParamType, UserEvent } from "../types";
import { pickRandomFromArray } from "../utils";
import { enterText } from "./enter-text";

interface TypeRandomParams {
	variants: string[];
}

const typeRandom: UserEvent<TypeRandomParams> = (
	tabId,
	{ params: { variants } }
) => {
	const text = pickRandomFromArray(variants);

	return enterText(tabId, {
		params: { target: { type: ActionDynamicParamType.Text, text } },
	});
};

export { typeRandom };
