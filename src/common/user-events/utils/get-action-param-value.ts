import { ScriptVariables } from "common/scripts";

import { ActionDynamicParam, ActionDynamicParamType } from "../types";

const getActionParamValue = (
	param: ActionDynamicParam,
	variables?: ScriptVariables
): string => {
	switch (param.type) {
		case ActionDynamicParamType.Variable: {
			const value = variables?.[param.use];
			if (!value) {
				throw new Error("No variable found with name" + param.use);
			}
			return value;
		}
		case ActionDynamicParamType.Text: {
			return param.text;
		}
		case ActionDynamicParamType.Script: {
			return param.script;
		}
		case ActionDynamicParamType.Selector: {
			return param.selector;
		}
	}

	throw new Error("No value found for " + JSON.stringify(param));
};

export { getActionParamValue };
