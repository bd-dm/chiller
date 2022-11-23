import { onMessage } from "../common";
import { MessageType } from "../common/message-carrier/enums";
import { onPageReady } from "./utils";
import {
	onGetCurrentTab,
	onGetTabScreenshot,
	onInjectContent,
	onSendDebuggerCommand,
} from "./listeners";

chrome.tabs.onUpdated.addListener(onPageReady);

onMessage(MessageType.InjectContent, onInjectContent);
onMessage(MessageType.GetCurrentTab, onGetCurrentTab);
onMessage(MessageType.SendDebuggerCommand, onSendDebuggerCommand);
onMessage(MessageType.GetTabScreenshot, onGetTabScreenshot);
