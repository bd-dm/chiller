import { MessageSender } from "../types";

const sendMessage: MessageSender = async (message) => {
	return chrome.runtime.sendMessage({ type: message });
};

export { sendMessage };
