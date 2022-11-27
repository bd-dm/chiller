import { MessageListener, MessageType } from "common/message-carrier";

const onGetCurrentTab: MessageListener<MessageType.GetCurrentTab> = (
	message,
	sender,
	sendResponse
) => {
	const queryOptions = { active: true, currentWindow: true };
	chrome.tabs.query(queryOptions, ([tab]) => {
		if (!tab) {
			return;
		}

		sendResponse(tab);
	});
	return true;
};

export { onGetCurrentTab };
