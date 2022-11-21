import {
	ActionTarget,
	SelectorActionTarget,
	VariableActionTarget,
} from "../types";
import { ActionTargetType } from "../enums";
import { ScriptVariables } from "../../types";
import { isNull, isUndefined } from "lodash-es";

const getTargetElement = <ElementType extends HTMLElement>(
	target: ActionTarget,
	variables?: ScriptVariables
): ElementType => {
	if (isUndefined(target.type)) {
		if (!isUndefined((target as SelectorActionTarget).selector)) {
			target.type = ActionTargetType.Selector;
		} else if (!isUndefined((target as VariableActionTarget).use)) {
			target.type = ActionTargetType.Variable;
		}
	}

	let element: ElementType | null;

	switch (target.type) {
		case ActionTargetType.Selector: {
			element = document.querySelector(target.selector);
			break;
		}
		case ActionTargetType.Variable: {
			if (isUndefined(variables)) {
				element = null;
				break;
			}

			const variable = target.use;
			const selector = variables[variable];

			console.log("click", variable, selector);
			element = document.querySelector(selector);
			break;
		}
		default: {
			element = null;
		}
	}

	if (isNull(element)) {
		throw new Error("No target found with options: " + JSON.stringify(target));
	}

	return element;
};

export { getTargetElement };
