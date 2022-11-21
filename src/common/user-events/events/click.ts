import { sendMessage } from "../../message-carrier";
import { MessageType } from "../../message-carrier/enums";
import { UserEventWithTarget } from "../types";
import { getTargetElement } from "../utils";

const click: UserEventWithTarget = async (
	tabId,
	{ params: { target }, variables }
): Promise<void> => {
	const element = getTargetElement(target, variables);

	const rect = element.getBoundingClientRect();
	const x = (rect.left + rect.right) / 2;
	const y = (rect.top + rect.bottom) / 2;

	const debuggee = { tabId };

	await sendMessage(MessageType.SendDebuggerCommand, {
		target: debuggee,
		method: "Input.dispatchMouseEvent",
		commandParams: {
			type: "mousePressed",
			button: "left",
			clickCount: 1,
			x,
			y,
		},
	});
	await sendMessage(MessageType.SendDebuggerCommand, {
		target: debuggee,
		method: "Input.dispatchMouseEvent",
		commandParams: {
			type: "mouseReleased",
			button: "left",
			x,
			y,
		},
	});
};

export { click };
