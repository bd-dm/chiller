import { UserEvent } from "../types";
import { pressKey, PressKeyType } from "./press-key";

interface EnterCharParams {
	char: string;
}

const enterChar: UserEvent<EnterCharParams> = async (
	tabId,
	{ params: { char } }
): Promise<void> => {
	return pressKey(tabId, { params: { type: PressKeyType.Char, text: char } });
};

export { enterChar };
