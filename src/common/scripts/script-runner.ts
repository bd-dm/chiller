import { userEvents } from "common/user-events";

import { getScript } from "./get-script";
import { getScriptBody } from "./get-script-body";
import { ScriptData } from "./types";

const scriptRunner = async (
	tabId: chrome.tabs.Tab["id"],
	scriptId: ScriptData["id"]
) => {
	const script = await getScript(scriptId);
	const { steps, variables } = getScriptBody(script);

	userEvents.start(tabId);

	for (let i = 0; i < steps.length; i++) {
		const step = steps[i];
		const { action, params } = step;

		await userEvents[action](params as never, variables);
	}
};

export { scriptRunner };
