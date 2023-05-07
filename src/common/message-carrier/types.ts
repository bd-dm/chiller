import { MessageType } from "./enums";

interface MessageBase<Type extends MessageType> {
	type: Type;
}

interface DebuggerMessageContent {
	method:
		| "Input.dispatchMouseEvent"
		| "Input.dispatchKeyEvent"
		| "Runtime.evaluate";
	target: chrome.debugger.Debuggee;
	// eslint-disable-next-line @typescript-eslint/ban-types
	commandParams?: Object;
}

type MessageContent<Type extends MessageType> =
	Type extends MessageType.GetCurrentTab
		? void
		: Type extends MessageType.SendDebuggerCommand
		? DebuggerMessageContent
		: Type extends MessageType.InjectContent
		? void
		: never;

type Message<Type extends MessageType> = MessageBase<Type> &
	MessageContent<Type>;

type MessageGetCurrentTabResult = chrome.tabs.Tab;
type MessageResult<Type extends MessageType> =
	Type extends MessageType.GetCurrentTab
		? MessageGetCurrentTabResult
		: Type extends MessageType.SendDebuggerCommand
		? void
		: Type extends MessageType.InjectContent
		? void
		: never;

// Worker side

type MessageListener<Type extends MessageType> = (
	message: Message<Type>,
	sender: chrome.runtime.MessageSender,
	sendResponse: (result: MessageResult<Type>) => void
) => boolean | undefined;

type onMessageFn = <Type extends MessageType>(
	messageType: Type,
	callback: MessageListener<Type>
) => void;

// Client side

type MessageSender = <Type extends MessageType>(
	message: Type,
	content?: MessageContent<Type>
) => Promise<MessageResult<Type>>;

export type { Message, MessageListener, MessageSender, onMessageFn };
