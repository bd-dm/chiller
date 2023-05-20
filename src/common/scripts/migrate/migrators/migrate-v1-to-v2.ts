import { nanoid } from "nanoid";

import { ActionDynamicParamType } from "../../../user-events";
import { getScriptBody } from "../../get-script-body";
import { ScriptData } from "../../types";

/**
 * What changed:
 * 	1. Added `id` field for steps item
 * 	2. Removed `name` field from steps item
 * 	3. Action `type` is renamed to `enterText`
 * 	4. For action `enterText` `params.text` renamed to `params.target`
 * 	5. For action `runScript` `params.script` renamed to `params.target`
 */
const migrateV1ToV2 = (script: ScriptData): ScriptData => {
	const body = getScriptBody(script);
	const { steps } = body;

	const nextSteps = steps.map((step) => {
		// @ts-ignore comparing with old model so types are wrong
		if (step.action === "type") {
			step.action = "enterText";
			step.params = {
				// @ts-ignore taking from old model so types are wrong
				target: step.params.text,
			};
		}

		if (step.action === "runScript") {
			step.params = {
				// @ts-ignore taking from old model so types are wrong
				target: step.params.script,
			};
		}

		return {
			id: nanoid(),
			action: step.action,
			params: step.params,
		};
	});

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
