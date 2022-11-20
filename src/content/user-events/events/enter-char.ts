import { UserEvent } from "../types";
import { pressKey, PressKeyType } from "./press-key";

interface EnterCharParams {
	char: string;
}

const enterChar: UserEvent<EnterCharParams> = async (
	tabId,
	{ char }
): Promise<void> => {
	return pressKey(tabId, { type: PressKeyType.Char, text: char });
};

export { enterChar };
