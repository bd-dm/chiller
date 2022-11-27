import { ScriptVariables } from "@/common";

import { ConstructorVariableItem } from "../types";

const variablesToArray = (
	variables: ScriptVariables
): ConstructorVariableItem[] =>
	Object.entries(variables).map(([name, value]) => ({ name, value }));

export { variablesToArray };
