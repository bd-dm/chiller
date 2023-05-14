import { Component } from "solid-js";

import { Icon, IconName } from "../../../components";
import { UserEventAction } from "../../../user-events";
import {
	ParamsInputClearInput,
	ParamsInputClick,
	ParamsInputEnterChar,
	ParamsInputEnterText,
	ParamsInputPressKey,
	ParamsInputRunScript,
	ParamsInputSleep,
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

const actionNames: Record<UserEventAction, string> = {
	click: "Click",
	pressKey: "Press Key",
	enterText: "Enter text",
	typeRandom: "Enter random text from list",
	waitForElement: "Wait for element",
	enterChar: "Enter character",
	clearInput: "Clear input",
	sleep: "Sleep/Wait",
	runScript: "Execute script",
};

const actionIcons: Record<UserEventAction, IconName> = {
	click: IconName.Click,
	pressKey: IconName.Keyboard,
	enterText: IconName.Text,
	typeRandom: IconName.Text,
	waitForElement: IconName.Wait,
	enterChar: IconName.Text,
	clearInput: IconName.Backspace,
	sleep: IconName.Sleep,
	runScript: IconName.Javascript,
};

const actionOptions: ConstructorStepActionOption[] = [
	{
		value: "click",
		name: actionNames.click,
		icon: () => <Icon name={actionIcons.click} />,
	},
	{
		value: "pressKey",
		name: actionNames.pressKey,
		icon: () => <Icon name={actionIcons.pressKey} />,
	},
	{
		value: "enterText",
		name: actionNames.enterText,
		icon: () => <Icon name={actionIcons.enterText} />,
	},
	{
		value: "typeRandom",
		name: actionNames.typeRandom,
		icon: () => <Icon name={actionIcons.typeRandom} />,
	},
	{
		value: "waitForElement",
		name: actionNames.waitForElement,
		icon: () => <Icon name={actionIcons.waitForElement} />,
	},
	{
		value: "clearInput",
		name: actionNames.clearInput,
		icon: () => <Icon name={actionIcons.clearInput} />,
	},
	{
		value: "sleep",
		name: actionNames.sleep,
		icon: () => <Icon name={actionIcons.sleep} />,
	},
	{
		value: "runScript",
		name: actionNames.runScript,
		icon: () => <Icon name={actionIcons.runScript} />,
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
		case "enterText": {
			return ParamsInputEnterText;
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

export { actionIcons, actionNames, actionOptions, getActionParamsComponents };
