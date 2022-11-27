import {
	ActionDynamicParam,
	ScriptData,
	ScriptStep,
	UserEventAction,
} from "@/common";

interface ScriptConstructorProps {
	scriptId?: ScriptData["id"];
	onResult?: (result: ScriptData) => void;
}

interface ConstructorVariableItem {
	name: string;
	value: string;
}
type ConstructorVariableItems = ConstructorVariableItem[];

type ConstructorStepItem<ActionType extends UserEventAction = UserEventAction> =
	Partial<ScriptStep<ActionType>>;
type ConstructorStepItemAction<
	ActionType extends UserEventAction = UserEventAction
> = ConstructorStepItem<ActionType>["action"];
type ConstructorStepItemParams<
	ActionType extends UserEventAction = UserEventAction
> = ConstructorStepItem<ActionType>["params"];
type ConstructorStepItems = ConstructorStepItem[];

interface ConstructorStepActionOption {
	value: NonNullable<ConstructorStepItemAction>;
	name: string;
}

type ConstructorStepParamsChangeHandler<
	ActionType extends UserEventAction = UserEventAction
> = (
	params: Record<
		keyof ConstructorStepItemParams<ActionType>,
		ConstructorStepItemParams<ActionType>
	>
) => void;
type ConstructorStepParamChangeHandler = (param: ActionDynamicParam) => void;

interface ConstructorParamsInputProps<
	ActionType extends UserEventAction = UserEventAction
> {
	action: NonNullable<ConstructorStepItemAction>;
	params?: ConstructorStepItemParams<ActionType>;
	onChange: ConstructorStepParamsChangeHandler<ActionType>;
}

export type {
	ConstructorParamsInputProps,
	ConstructorStepActionOption,
	ConstructorStepItem,
	ConstructorStepItemAction,
	ConstructorStepItemParams,
	ConstructorStepItems,
	ConstructorStepParamChangeHandler,
	ConstructorStepParamsChangeHandler,
	ConstructorVariableItem,
	ConstructorVariableItems,
	ScriptConstructorProps,
};
