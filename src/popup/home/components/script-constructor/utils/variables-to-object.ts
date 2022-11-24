import { ScriptVariables } from "../../../../../common/types";
import { VariableInputItem } from "../types";

const variablesToObject = (variables: VariableInputItem[]): ScriptVariables => {
	const object: ScriptVariables = {};
	variables.forEach(({ name, value }) => {
		object[name] = value;
	});
	return object;
};

export { variablesToObject };
