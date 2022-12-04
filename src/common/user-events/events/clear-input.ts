import { UserEventWithTarget } from "../types";
import { getCtrlOrCmdModifier, getTargetElement } from "../utils";
import { click } from "./click";
import { pressKeyCustom, PressKeyType } from "./press-key-custom";

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
		await pressKeyCustom(tabId, {
			params: {
				type: PressKeyType.KeyDown,
				code: "End",
				windowsVirtualKeyCode: 35,
				nativeVirtualKeyCode: 35,
			},
		});
		await pressKeyCustom(tabId, {
			params: {
				type: PressKeyType.KeyUp,
				code: "End",
				windowsVirtualKeyCode: 35,
				nativeVirtualKeyCode: 35,
			},
		});
		await pressKeyCustom(tabId, {
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
