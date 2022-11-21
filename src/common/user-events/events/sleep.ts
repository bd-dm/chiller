import { UserEvent } from "../types";
import { sleep as sleepFn } from "../../utils";

interface SleepParams {
	ms: number;
}

const sleep: UserEvent<SleepParams> = async (
	_tabId,
	{ params: { ms } }
): Promise<void> => {
	return await sleepFn(ms);
};

export { sleep };
