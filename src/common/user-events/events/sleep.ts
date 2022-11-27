import { sleep as sleepFn } from "../../utils";
import { UserEvent } from "../types";

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
