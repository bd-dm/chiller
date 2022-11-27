import { UserEventWithTarget } from "../types";
import { pressKey, PressKeyType } from "./press-key";
import { click } from "./click";
import { getCtrlOrCmdModifier, getTargetElement } from "../utils";

interface ClearInputParams {
	selector: string;
}

const clearInput: UserEventWithTarget<ClearInputParams> = async (
	tabId,
	{ params: { target }, variables }
) => {
	const { element } = getTargetElement<HTMLInputElement>(target, variables);
	if (!element) {
		return;
	}

	await click(tabId, { params: { target }, variables });
	const inputValueLength = element.value.length;

	for (let i = 0; i < inputValueLength; i++) {
		await pressKey(tabId, {
			params: {
				type: PressKeyType.KeyDown,
				code: "End",
				windowsVirtualKeyCode: 35,
				nativeVirtualKeyCode: 35,
			},
		});
		await pressKey(tabId, {
			params: {
				type: PressKeyType.KeyUp,
				code: "End",
				windowsVirtualKeyCode: 35,
				nativeVirtualKeyCode: 35,
			},
		});
		await pressKey(tabId, {
			params: {
				type: PressKeyType.KeyDown,
				code: "Backspace",
				modifiers: [getCtrlOrCmdModifier()],
				windowsVirtualKeyCode: 8,
				nativeVirtualKeyCode: 8,
			},
		});
	}
};

export { clearInput };
