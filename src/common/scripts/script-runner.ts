import { Script } from "./types";
import { getScript } from "./get-script";
import { ScriptBody } from "../types";
import { userEvents } from "../user-events";

const scriptRunner = async (
	tabId: chrome.tabs.Tab["id"],
	scriptId: Script["id"]
) => {
	const script = await getScript(scriptId);
	const { steps, variables } = JSON.parse(script.json) as ScriptBody;

	userEvents.start(tabId);

	for (let i = 0; i < steps.length; i++) {
		const step = steps[i];
		const { action, params } = step;

		await userEvents[action](params as never, variables);
	}
};

export { scriptRunner };
