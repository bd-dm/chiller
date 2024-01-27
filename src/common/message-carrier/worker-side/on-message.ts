import { MessageListener, onMessageFn } from "../types";

const onMessage: onMessageFn = (messageType, callback) => {
	const newListener: MessageListener<typeof messageType> = (
		message,
		sender,
		sendResponse,
	) => {
		if (message.type === messageType) {
			return callback(message, sender, sendResponse);
		}
	};
	chrome.runtime.onMessage.addListener(newListener);
};

export { onMessage };
