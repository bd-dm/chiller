import { ConstructorVariableItem } from "../types";
import { ScriptVariables } from "../../../../../common";

const variablesToArray = (
	variables: ScriptVariables
): ConstructorVariableItem[] =>
	Object.entries(variables).map(([name, value]) => ({ name, value }));

export { variablesToArray };
