import { sendMessage } from "../../message-carrier";
import { MessageType } from "../../message-carrier/enums";
import { UserEvent } from "../types";
import { isUndefined } from "lodash-es";

enum PressKeyType {
	KeyDown = "keyDown",
	KeyUp = "keyUp",
	RawKeyDown = "rawKeyDown",
	Char = "char",
}

enum PressKeyModifier {
	Alt = 1,
	Ctrl = 2,
	Command = 4,
	Shift = 8,
}

interface PressKeyParams {
	type: PressKeyType;
	modifiers?: PressKeyModifier[];
	text?: string;
	code?: string | number;
	keyIdentifier?: string;
	key?: string;
	commands?: string;
	windowsVirtualKeyCode?: number;
	nativeVirtualKeyCode?: number;
}

const pressKey: UserEvent<PressKeyParams> = async (
	tabId,
	{
		type,
		modifiers: modifiersList = [],
		text,
		code,
		keyIdentifier,
		key,
		commands,
		windowsVirtualKeyCode,
		nativeVirtualKeyCode,
	}
): Promise<void> => {
	const modifiers = modifiersList?.reduce((acc, curr) => acc + curr, 0);
	const debuggee = { tabId };

	const commandParams: Record<string, unknown> = {
		type,
	};

	if (!isUndefined(text)) {
		commandParams.text = text;
	}
	if (!isUndefined(code)) {
		commandParams.code = code;
	}
	if (!isUndefined(keyIdentifier)) {
		commandParams.keyIdentifier = keyIdentifier;
	}
	if (!isUndefined(key)) {
		commandParams.key = key;
	}
	if (!isUndefined(commands)) {
		commandParams.commands = commands;
	}
	if (!isUndefined(windowsVirtualKeyCode)) {
		commandParams.windowsVirtualKeyCode = windowsVirtualKeyCode;
	}
	if (!isUndefined(nativeVirtualKeyCode)) {
		commandParams.nativeVirtualKeyCode = nativeVirtualKeyCode;
	}
	if (modifiers !== 0) {
		commandParams.modifiers = modifiers;
	}

	console.log("press key", tabId, commandParams);

	await sendMessage(MessageType.SendDebuggerCommand, {
		target: debuggee,
		method: "Input.dispatchKeyEvent",
		commandParams,
	});
};

export { pressKey, PressKeyType, PressKeyModifier };
