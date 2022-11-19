import { MessageListener, onMessageFn } from "../types";

const onMessage: onMessageFn = (messageType, callback) => {
	const newListener: MessageListener = (message, sender, sendResponse) => {
		if (message.type === messageType) {
			callback(message, sender, sendResponse);
		}
	};
	chrome.runtime.onMessage.addListener(newListener);
};

export { onMessage };
