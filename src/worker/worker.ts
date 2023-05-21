import { MessageType, onMessage } from "common/message-carrier";

import {
	onGetCurrentTab,
	onInjectContent,
	onSendDebuggerCommand,
} from "./listeners";
import { onPageReady } from "./utils";

chrome.tabs.onUpdated.addListener(onPageReady);

onMessage(MessageType.InjectContent, onInjectContent);
onMessage(MessageType.GetCurrentTab, onGetCurrentTab);
onMessage(MessageType.SendDebuggerCommand, onSendDebuggerCommand);
