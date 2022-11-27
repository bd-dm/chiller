import { sendMessage, MessageType } from "../../message-carrier";
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
	/** Used to press key only by code */
	keyCode?: number;
}

const pressKey: UserEvent<PressKeyParams> = async (
	tabId,
	{
		params: {
			type,
			modifiers: modifiersList = [],
			text,
			code,
			keyIdentifier,
			key,
			commands,
			windowsVirtualKeyCode,
			nativeVirtualKeyCode,
			keyCode,
		},
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

	if (!isUndefined(keyCode)) {
		commandParams.windowsVirtualKeyCode = keyCode;
		commandParams.nativeVirtualKeyCode = keyCode;
		commandParams.code = keyCode;
	}

	await sendMessage(MessageType.SendDebuggerCommand, {
		target: debuggee,
		method: "Input.dispatchKeyEvent",
		commandParams,
	});
};

export { pressKey, PressKeyType, PressKeyModifier };
