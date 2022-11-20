import { UserEvent } from "../types";
import { pressKey, PressKeyType } from "./press-key";
import { click } from "./click";
import { getCtrlOrCmdModifier } from "../utils/get-ctrl-or-cmd-modifier";

interface CleanInputParams {
	selector: string;
}

const clearInput: UserEvent<CleanInputParams> = async (tabId, { selector }) => {
	const element = document.querySelector(selector) as HTMLInputElement;
	if (!element) {
		return;
	}

	await click(tabId, { selector });
	const inputValueLength = element.value.length;

	for (let i = 0; i < inputValueLength; i++) {
		await pressKey(tabId, {
			type: PressKeyType.KeyDown,
			code: "End",
			windowsVirtualKeyCode: 35,
			nativeVirtualKeyCode: 35,
		});
		await pressKey(tabId, {
			type: PressKeyType.KeyUp,
			code: "End",
			windowsVirtualKeyCode: 35,
			nativeVirtualKeyCode: 35,
		});
		await pressKey(tabId, {
			type: PressKeyType.KeyDown,
			code: "Backspace",
			modifiers: [getCtrlOrCmdModifier()],
			windowsVirtualKeyCode: 8,
			nativeVirtualKeyCode: 8,
		});
	}
};

export { clearInput };
