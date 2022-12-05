import { Component } from "solid-js";

import {
	ParamsInputClearInput,
	ParamsInputClick,
	ParamsInputEnterChar,
	ParamsInputPressKey,
	ParamsInputRunScript,
	ParamsInputSleep,
	ParamsInputType,
	ParamsInputTypeRandom,
	ParamsInputWaitForElement,
} from "./components";
import {
	ConstructorParamsInputProps,
	ConstructorStepActionOption,
	ConstructorStepItemAction,
} from "./types";

type GetActionParamsComponentsMap<
	ActionType extends ConstructorStepItemAction = ConstructorStepItemAction
> = (
	action: NonNullable<ActionType>
) => Component<ConstructorParamsInputProps<NonNullable<ActionType>>>;

const actionOptions: ConstructorStepActionOption[] = [
	{ value: "click", name: "Click" },
	{ value: "pressKey", name: "Press Key" },
	{ value: "type", name: "Type string" },
	{ value: "typeRandom", name: "Type random string from list" },
	{ value: "enterChar", name: "Enter character" },
	{ value: "waitForElement", name: "Wait for element" },
	{ value: "clearInput", name: "Clear input" },
	{ value: "sleep", name: "Sleep" },
	{ value: "runScript", name: "Run script" },
];

const getActionParamsComponents: GetActionParamsComponentsMap = (action) => {
	switch (action) {
		case "clearInput": {
			return ParamsInputClearInput;
		}
		case "click": {
			return ParamsInputClick;
		}
		case "enterChar": {
			return ParamsInputEnterChar;
		}
		case "pressKey": {
			return ParamsInputPressKey;
		}
		case "sleep": {
			return ParamsInputSleep;
		}
		case "type": {
			return ParamsInputType;
		}
		case "typeRandom": {
			return ParamsInputTypeRandom;
		}
		case "waitForElement": {
			return ParamsInputWaitForElement;
		}
		case "runScript": {
			return ParamsInputRunScript;
		}
	}
};

export { actionOptions, getActionParamsComponents };
