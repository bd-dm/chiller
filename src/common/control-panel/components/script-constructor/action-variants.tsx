import { Component } from "solid-js";

import { Icon, IconName } from "../../../components";
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
	{ value: "click", name: "Click", icon: () => <Icon name={IconName.Click} /> },
	{
		value: "pressKey",
		name: "Press Key",
		icon: () => <Icon name={IconName.Keyboard} />,
	},
	{
		value: "type",
		name: "Enter text",
		icon: () => <Icon name={IconName.Text} />,
	},
	{
		value: "typeRandom",
		name: "Enter random text from list",
		icon: () => <Icon name={IconName.Text} />,
	},
	{
		value: "waitForElement",
		name: "Wait for element",
		icon: () => <Icon name={IconName.Wait} />,
	},
	{
		value: "clearInput",
		name: "Clear input",
		icon: () => <Icon name={IconName.Backspace} />,
	},
	{
		value: "sleep",
		name: "Sleep/Wait",
		icon: () => <Icon name={IconName.Sleep} />,
	},
	{
		value: "runScript",
		name: "Execute script",
		icon: () => <Icon name={IconName.Javascript} />,
	},
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
