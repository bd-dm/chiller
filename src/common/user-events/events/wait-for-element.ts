import { UserEventWithTarget } from "../types";
import { getTargetElement } from "../utils";

interface WaitForElementParams {
	timeout?: number;
}

const POLL_INTERVAL = 100;
const WAIT_FOR_ELEMENT_TIMEOUT = 10000;

const waitForElement: UserEventWithTarget<WaitForElementParams> = async (
	_tabId,
	{ params: { target, timeout: timeoutParam }, variables }
): Promise<void> => {
	const timeout = timeoutParam ?? WAIT_FOR_ELEMENT_TIMEOUT;

	return new Promise((resolve, reject) => {
		const startTime = new Date().getTime();
		const interval = setInterval(() => {
			const isTimedOut = new Date().getTime() > startTime + timeout;

			try {
				getTargetElement(target, variables);
				clearInterval(interval);
				resolve();
			} catch (_error) {
				if (isTimedOut) {
					reject(
						new Error("Target " + JSON.stringify(target) + " not found on page")
					);
				}
			}
		}, POLL_INTERVAL);
	});
};

export { WAIT_FOR_ELEMENT_TIMEOUT, waitForElement };
