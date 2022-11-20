import { UserEvent } from "../types";
import { pickRandomFromArray } from "../utils";
import { type } from "../events";

interface TypeRandomParams {
	variants: string[];
}

const typeRandom: UserEvent<TypeRandomParams> = (tabId, { variants }) => {
	const text = pickRandomFromArray(variants);

	return type(tabId, { text });
};

export { typeRandom };
