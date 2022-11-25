import { Script } from "../../../../common/scripts/types";
import { ScriptStep } from "../../../../common/types";
import { UserEventAction } from "../../../../common/user-events";
import { Component } from "solid-js";
import { ActionParam } from "../../../../common/user-events/types";

interface ScriptConstructorProps {
	scriptId?: Script["id"];
	onResult?: (result: Script) => void;
}

interface VariableInputItem {
	name: string;
	value: string;
}

type StepInputItem<ActionType extends UserEventAction = UserEventAction> =
	Partial<ScriptStep<ActionType>>;

interface ActionOption {
	value: NonNullable<StepInputItem["action"]>;
	name: string;
}

type ActionParamsChangeHandler = (
	params: Record<keyof StepInputItem["params"], ActionParam>
) => void;
type ActionParamChangeHandler = (param: ActionParam) => void;

interface ActionParamsComponentProps<
	ParamsType extends StepInputItem["params"] = StepInputItem["params"]
> {
	action: NonNullable<StepInputItem["action"]>;
	params?: ParamsType;
	onChange: ActionParamsChangeHandler;
}

interface ActionParamCommonProps<ParamType extends ActionParam = ActionParam> {
	action: NonNullable<StepInputItem["action"]>;
	param?: ParamType;
	onChange: ActionParamChangeHandler;
}

type GetActionParamsComponentsMap = (
	action: NonNullable<StepInputItem["action"]>
) => Component<ActionParamsComponentProps> | undefined;

export type {
	ActionOption,
	ScriptConstructorProps,
	VariableInputItem,
	GetActionParamsComponentsMap,
	ActionParamChangeHandler,
	ActionParamCommonProps,
	StepInputItem,
	ActionParamsComponentProps,
	ActionParamsChangeHandler,
};
