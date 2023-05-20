import { nanoid } from "nanoid";

import { getScriptBody } from "../../get-script-body";
import { ScriptData } from "../../types";

/**
 * What changed:
 * 	1. Added `id` field for steps item
 * 	2. Removed `name` field from steps item
 */
const migrateV1ToV2 = (script: ScriptData): ScriptData => {
	const body = getScriptBody(script);
	const { steps } = body;

	const nextSteps = steps.map((step) => ({
		id: nanoid(),
		action: step.action,
		params: step.params,
	}));

	const nextBody = {
		...body,
		steps: nextSteps,
		version: 2,
	};

	return {
		...script,
		body: JSON.stringify(nextBody),
	};
};

export { migrateV1ToV2 };
