import { ScriptVariables } from "../../../../../common/types";
import { VariableInputItem } from "../types";

const variablesToArray = (variables: ScriptVariables): VariableInputItem[] =>
	Object.entries(variables).map(([name, value]) => ({ name, value }));

export { variablesToArray };
