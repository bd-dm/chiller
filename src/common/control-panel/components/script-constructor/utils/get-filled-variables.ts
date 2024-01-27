import { isEmpty } from "lodash-es";

import { ConstructorVariableItems } from "../types";

const getFilledVariables = (
	variables: ConstructorVariableItems,
): ConstructorVariableItems =>
	variables.filter((variable) => !isEmpty(variable.name));

export { getFilledVariables };
