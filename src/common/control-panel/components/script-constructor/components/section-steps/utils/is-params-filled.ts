import {
	ActionDynamicParamType,
	UserEventAction,
	UserEventParams,
} from "common/user-events";
import { isEmpty, isUndefined } from "lodash-es";

const isParamsFilled = (
	action?: UserEventAction,
	params?: UserEventParams<UserEventAction>
) => {
	if (isUndefined(action) || isUndefined(params)) {
		return false;
	}

	switch (action) {
		case "click":
		case "clearInput":
		case "waitForElement":
		case "enterText":
		case "runScript": {
			const paramsWithTarget = params as UserEventParams<
				"click" | "clearInput" | "waitForElement" | "enterText" | "runScript"
			>;
			const target = paramsWithTarget.target;
			switch (target.type) {
				case ActionDynamicParamType.Text: {
					return !isEmpty(target.text);
				}
				case ActionDynamicParamType.Selector: {
					return !isEmpty(target.selector);
				}
				case ActionDynamicParamType.Variable: {
					return !isEmpty(target.use);
				}
				case ActionDynamicParamType.Script: {
					return !isEmpty(target.script);
				}
			}
			return false;
		}
		case "pressKey": {
			const paramsWithKey = params as UserEventParams<"pressKey">;
			return !isUndefined(paramsWithKey.key);
		}
		case "enterChar": {
			const paramsWithChar = params as UserEventParams<"enterChar">;
			return !isUndefined(paramsWithChar.char);
		}
		case "typeRandom": {
			const paramsWithTypeRandom = params as UserEventParams<"typeRandom">;
			return (
				!isUndefined(paramsWithTypeRandom.variants) &&
				!isEmpty(paramsWithTypeRandom.variants)
			);
		}
		case "sleep": {
			const paramsWithSleep = params as UserEventParams<"sleep">;
			return !isUndefined(paramsWithSleep.ms);
		}
	}
};

export { isParamsFilled };
