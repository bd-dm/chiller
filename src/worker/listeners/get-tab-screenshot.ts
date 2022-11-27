import { MessageListener, MessageType } from "@/common";

const onGetTabScreenshot: MessageListener<MessageType.GetTabScreenshot> = (
	message,
	sender,
	sendResponse
) => {
	chrome.tabs.captureVisibleTab((dataUrl) => {
		if (!dataUrl) {
			sendResponse(null);
			return;
		}

		sendResponse(dataUrl);
	});
	return true;
};

export { onGetTabScreenshot };
