import { MessageSender } from "../types";

const sendMessage: MessageSender = async (message) => {
	return chrome.runtime.sendMessage(message);
};

export { sendMessage };
