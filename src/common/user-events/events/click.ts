import { sendMessage } from "../../message-carrier";
import { MessageType } from "../../message-carrier/enums";
import { isNull } from "lodash-es";
import { UserEvent } from "../types";

interface ClickParams {
	selector: string;
}

const click: UserEvent<ClickParams> = async (
	tabId,
	{ selector }
): Promise<void> => {
	const element = document.querySelector(selector);

	if (isNull(element)) {
		throw new Error("No element found with selector " + selector);
	}

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
