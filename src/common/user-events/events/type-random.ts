import { UserEvent } from "../types";
import { pickRandomFromArray } from "../utils";
import { type } from "./type";

interface TypeRandomParams {
	variants: string[];
}

const typeRandom: UserEvent<TypeRandomParams> = (
	tabId,
	{ params: { variants } }
) => {
	const text = pickRandomFromArray(variants);

	return type(tabId, { params: { text } });
};

export { typeRandom };
