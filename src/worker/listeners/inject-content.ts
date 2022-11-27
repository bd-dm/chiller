import { MessageListener, MessageType } from "common/message-carrier";
import { isUndefined } from "lodash-es";

import { injectContent } from "../utils";
import { getCurrentTab } from "../utils/get-current-tab";

const onInjectContent: MessageListener<MessageType.InjectContent> = (
	message,
	sender,
	sendResponse
) => {
	getCurrentTab().then((tab) => {
		if (isUndefined(tab) || isUndefined(tab.id)) {
			console.warn("Tab not found");
			sendResponse();
			return;
		}

		injectContent(tab.id, true)
			.then(() => {
				sendResponse();
			})
			.catch((error) => {
				console.warn(error);
				sendResponse();
			});
	});
	return true;
};

export { onInjectContent };
