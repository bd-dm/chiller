import { UserEvent } from "../types";
import { enterChar } from "./enter-char";

interface TypeParams {
	text: string;
}

const type: UserEvent<TypeParams> = async (
	tabId,
	{ params: { text } }
): Promise<void> => {
	for (let i = 0; i < text.length; i++) {
		await enterChar(tabId, { params: { char: text[i] } });
	}
};

export { type };
