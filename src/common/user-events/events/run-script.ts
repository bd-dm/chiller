import { MessageType, sendMessage } from "../../message-carrier";
import {
	ActionDynamicParamWithScript,
	ActionDynamicParamWithVariable,
	DefaultParamsType,
	UserEventWithTarget,
} from "../types";
import { getActionParamValue } from "../utils";

const runScript: UserEventWithTarget<
	DefaultParamsType,
	ActionDynamicParamWithVariable | ActionDynamicParamWithScript
> = async (tabId, { params: { target }, variables }): Promise<void> => {
	const scriptString = getActionParamValue(target, variables);

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
