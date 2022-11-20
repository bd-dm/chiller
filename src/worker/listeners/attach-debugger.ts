import { MessageListener } from "../../common/message-carrier/types";
import { MessageType } from "../../common/message-carrier/enums";

const onAttachDebugger: MessageListener<MessageType.AttachDebugger> = (
	{ target },
	sender,
	sendResponse
) => {
	chrome.debugger
		.attach(target, "1.3")
		.then(() => {
			sendResponse();
		})
		.catch((e) => {
			console.warn(e);
			sendResponse();
		});
	return true;
};

export { onAttachDebugger };
