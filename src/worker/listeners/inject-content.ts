import { MessageListener } from "../../common/message-carrier/types";
import { MessageType } from "../../common/message-carrier/enums";
import { injectContent } from "../utils";
import { getCurrentTab } from "../utils/get-current-tab";
import { isUndefined } from "lodash-es";

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
