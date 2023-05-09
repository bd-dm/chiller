import { ScriptData, ScriptStep } from "common/scripts";
import { ActionDynamicParam, UserEventAction } from "common/user-events";

interface ScriptConstructorProps {
	scriptId: ScriptData["id"];
	isEdit?: boolean;
	onSave?: (result: ScriptData) => void;
	onCancel?: () => void;
}

interface ConstructorVariableItem {
	name: string;
	value: string;
}
type ConstructorVariableItems = ConstructorVariableItem[];

type ConstructorStepItem<ActionType extends UserEventAction = UserEventAction> =
	Partial<ScriptStep<ActionType>> & Pick<ScriptStep<ActionType>, "id">;
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
