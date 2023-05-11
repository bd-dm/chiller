import { createStore } from "solid-js/store";

import { ConstructorStepItems } from "../types";

const [steps, setSteps] = createStore<ConstructorStepItems>([]);

export { setSteps, steps };
