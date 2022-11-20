import { MessageSender } from "../types";

const sendMessage: MessageSender = async (message, content) => {
	return chrome.runtime.sendMessage({ type: message, ...content });
};

export { sendMessage };
