import { UserEvent } from "../types";
import { sleep as sleepFn } from "../../utils";

interface EnterCharParams {
	ms: number;
}

const sleep: UserEvent<EnterCharParams> = async (
	_tabId,
	{ ms }
): Promise<void> => {
	return await sleepFn(ms);
};

export { sleep };
