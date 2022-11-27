import { ScriptVariables } from "common/scripts";
import { isNull, isUndefined } from "lodash-es";

import {
	ActionDynamicParam,
	ActionDynamicParamType,
	GetTargetElementFn,
	TargetElementData,
} from "../types";
import { getTargetElementBySelector } from "./get-target-element-by-selector";

const getTargetElement: GetTargetElementFn = <ElementType extends HTMLElement>(
	target: ActionDynamicParam,
	variables?: ScriptVariables
): TargetElementData<ElementType> => {
	let elementData: TargetElementData<ElementType> | null;

	switch (target.type) {
		case ActionDynamicParamType.Selector: {
			elementData = getTargetElementBySelector(target.selector);
			break;
		}
		case ActionDynamicParamType.Variable: {
			if (isUndefined(variables)) {
				elementData = null;
				break;
			}

			const variable = target.use;
			const selector = variables[variable];

			elementData = getTargetElementBySelector(selector);
			break;
		}
		default: {
			elementData = null;
		}
	}

	if (isNull(elementData)) {
		throw new Error("No target found with options: " + JSON.stringify(target));
	}

	return elementData;
};

export { getTargetElement };
