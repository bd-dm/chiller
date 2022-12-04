import { UserEvent } from "../types";
import { pressKeyCustom, PressKeyType } from "./press-key-custom";

interface EnterCharParams {
	char: string;
}

const enterChar: UserEvent<EnterCharParams> = async (
	tabId,
	{ params: { char } }
): Promise<void> => {
	return pressKeyCustom(tabId, {
		params: { type: PressKeyType.Char, text: char },
	});
};

export { enterChar };
