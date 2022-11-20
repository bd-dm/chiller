import { onMessage } from "../common";
import { MessageType } from "../common/message-carrier/enums";
import { injectContent } from "./utils";
import {
	onAttachDebugger,
	onGetCurrentTab,
	onSendDebuggerCommand,
} from "./listeners";

chrome.tabs.onUpdated.addListener(injectContent);

onMessage(MessageType.GetCurrentTab, onGetCurrentTab);
onMessage(MessageType.AttachDebugger, onAttachDebugger);
onMessage(MessageType.SendDebuggerCommand, onSendDebuggerCommand);
