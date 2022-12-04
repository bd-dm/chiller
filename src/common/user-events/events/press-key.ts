import { UserEvent } from "../types";
import { pressKeyCustom, PressKeyType } from "./press-key-custom";

enum Keys {
	Tab,
}

// https://www.toptal.com/developers/keycode
const keyCodes = {
	[Keys.Tab]: "Tab",
};

interface PressKeyParams {
	key: Keys;
}

const pressKey: UserEvent<PressKeyParams> = async (
	tabId,
	{ params: { key } }
): Promise<void> => {
	await pressKeyCustom(tabId, {
		params: { type: PressKeyType.KeyDown, key: keyCodes[key] },
	});
	await pressKeyCustom(tabId, {
		params: { type: PressKeyType.KeyUp, key: keyCodes[key] },
	});
};

export { Keys, pressKey };
