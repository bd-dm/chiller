import { MessageType, sendMessage } from "../../message-carrier";
import {
	ActionDynamicParamWithScript,
	ActionDynamicParamWithVariable,
	UserEvent,
} from "../types";
import { getActionParamValue } from "../utils";

interface RunScriptParams {
	script: ActionDynamicParamWithVariable | ActionDynamicParamWithScript;
}

const runScript: UserEvent<RunScriptParams> = async (
	tabId,
	{ params: { script }, variables }
): Promise<void> => {
	const scriptString = getActionParamValue(script, variables);

	const debuggee = { tabId };
	await sendMessage(MessageType.SendDebuggerCommand, {
		target: debuggee,
		method: "Runtime.evaluate",
		commandParams: {
			expression: scriptString,
		},
	});
};

export { runScript };
