import {
	ConstructorStepActionOption,
	ConstructorParamsInputProps,
	ConstructorStepItemAction,
} from "./types";
import {
	ParamsInputClick,
	ParamsInputType,
} from "./components/section-steps/components";
import { Component } from "solid-js";

type GetActionParamsComponentsMap = (
	action: NonNullable<ConstructorStepItemAction>
) => Component<ConstructorParamsInputProps> | undefined;

const actionOptions: ConstructorStepActionOption[] = [
	{ value: "click", name: "Click" },
	// { value: "pressKey", name: "Press Key" }, TODO implement press key params input
	{ value: "type", name: "Type string" },
	{ value: "typeRandom", name: "Type random string from list" },
	{ value: "enterChar", name: "Enter char" },
	{ value: "waitForElement", name: "Wait for element" },
	{ value: "clearInput", name: "Clear input" },
	{ value: "sleep", name: "Sleep" },
];

const getActionParamsComponents: GetActionParamsComponentsMap = (action) => {
	switch (action) {
		case "click": {
			return ParamsInputClick;
		}
		case "type": {
			return ParamsInputType;
		}
		default: {
			return undefined;
		}
	}
};

export { actionOptions, getActionParamsComponents };
