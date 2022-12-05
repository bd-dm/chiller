import { isUndefined } from "lodash-es";

import { ConstructorStepItems } from "../types";

const getFilledSteps = (steps: ConstructorStepItems): ConstructorStepItems =>
	steps.filter((step) => !isUndefined(step.action));

export { getFilledSteps };
