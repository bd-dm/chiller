import { MessageListener } from "../../common/message-carrier/types";
import { MessageType } from "../../common/message-carrier/enums";

const onSendDebuggerCommand: MessageListener<
	MessageType.SendDebuggerCommand
> = ({ target, method, commandParams }, sender, sendResponse) => {
	chrome.debugger.sendCommand(target, method, commandParams, (...args) => {
		console.log("debugger command done", args, target, method, commandParams);
		sendResponse();
	});
	return true;
};

export { onSendDebuggerCommand };
