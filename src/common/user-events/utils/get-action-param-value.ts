import { ActionParam, ActionParamType } from "../types";
import { ScriptVariables } from "../../types";

const getActionParamValue = (
	param: ActionParam,
	variables?: ScriptVariables
): string => {
	switch (param.type) {
		case ActionParamType.Variable: {
			const value = variables?.[param.use];
			if (!value) {
				throw new Error("No variable found with name" + param.use);
			}
			return value;
		}
		case ActionParamType.Text: {
			return param.text;
		}
		case ActionParamType.Selector: {
			return param.selector;
		}
	}
};

export { getActionParamValue };
