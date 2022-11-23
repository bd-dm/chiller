import { MessageListener } from "../../common/message-carrier/types";
import { MessageType } from "../../common/message-carrier/enums";

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
