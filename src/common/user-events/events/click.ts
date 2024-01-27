import { MessageType, sendMessage } from "common/message-carrier";

import { UserEventWithTarget } from "../types";
import { getTargetElement, scrollToElementIfNotVisible } from "../utils";

const click: UserEventWithTarget = async (
	tabId,
	{ params: { target }, variables },
): Promise<void> => {
	const { element, iframe } = getTargetElement(target, variables);
	scrollToElementIfNotVisible(element);

	const rect = element.getBoundingClientRect();
	let x = (rect.left + rect.right) / 2;
	let y = (rect.top + rect.bottom) / 2;

	if (iframe) {
		const iframeRect = iframe.getBoundingClientRect();
		x = x + iframeRect.left;
		y = y + iframeRect.top;
	}

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
