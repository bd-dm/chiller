import { sendMessage } from "../../message-carrier";
import { MessageType } from "../../message-carrier/enums";
import { UserEvent } from "../types";

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
}

const pressKey: UserEvent<PressKeyParams> = async (
	tabId,
	{ type, modifiers: modifiersList = [], text }
): Promise<void> => {
	const modifiers = modifiersList?.reduce((acc, curr) => acc + curr, 0);
	const debuggee = { tabId };

	await sendMessage(MessageType.SendDebuggerCommand, {
		target: debuggee,
		method: "Input.dispatchKeyEvent",
		commandParams: {
			type,
			modifiers,
			text,
		},
	});
};

export { pressKey, PressKeyType, PressKeyModifier };
