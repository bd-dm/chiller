import { MessageType } from "./enums";

interface Message<Type extends MessageType> {
	type: Type;
}

type MessageGetCurrentTabResult = chrome.tabs.Tab;
type MessageResult<Type extends MessageType> =
	Type extends MessageType.GetCurrentTab ? MessageGetCurrentTabResult : never;

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
	message: Type
) => Promise<MessageResult<Type>>;

export type { Message, MessageListener, MessageSender, onMessageFn };
