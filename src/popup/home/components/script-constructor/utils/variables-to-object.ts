import { ScriptVariables } from "@/common";

import { ConstructorVariableItem } from "../types";

const variablesToObject = (
	variables: ConstructorVariableItem[]
): ScriptVariables => {
	const object: ScriptVariables = {};
	variables.forEach(({ name, value }) => {
		object[name] = value;
	});
	return object;
};

export { variablesToObject };
