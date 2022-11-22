import { isNull, isUndefined } from "lodash-es";
import { ScriptVariables } from "../../../types";
import {
	ActionTarget,
	ElementData,
	SelectorActionTarget,
	VariableActionTarget,
} from "../types";
import { ActionTargetType } from "../enums";
import { getElementBySelector } from "./get-element-by-selector";

const getTargetElement = <ElementType extends HTMLElement>(
	target: ActionTarget,
	variables?: ScriptVariables
): ElementData<ElementType> => {
	if (isUndefined(target.type)) {
		if (!isUndefined((target as SelectorActionTarget).selector)) {
			target.type = ActionTargetType.Selector;
		} else if (!isUndefined((target as VariableActionTarget).use)) {
			target.type = ActionTargetType.Variable;
		}
	}

	let elementData: ElementData<ElementType> | null;

	switch (target.type) {
		case ActionTargetType.Selector: {
			elementData = getElementBySelector(target.selector);
			break;
		}
		case ActionTargetType.Variable: {
			if (isUndefined(variables)) {
				elementData = null;
				break;
			}

			const variable = target.use;
			const selector = variables[variable];

			elementData = getElementBySelector(selector);
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
