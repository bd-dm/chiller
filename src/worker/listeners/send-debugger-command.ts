import { MessageListener, MessageType } from "@/common";

const onSendDebuggerCommand: MessageListener<
	MessageType.SendDebuggerCommand
> = ({ target, method, commandParams }, sender, sendResponse) => {
	chrome.debugger.sendCommand(target, method, commandParams, () => {
		sendResponse();
	});
	return true;
};

export { onSendDebuggerCommand };
