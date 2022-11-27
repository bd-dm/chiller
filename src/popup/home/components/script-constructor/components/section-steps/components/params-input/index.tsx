import { JSXElement } from "solid-js";
import { Dynamic } from "solid-js/web";

import { getActionParamsComponents } from "../../../../action-variants";
import {
	ConstructorStepItemAction,
	ConstructorStepItemParams,
	ConstructorStepParamsChangeHandler,
} from "../../../../types";

interface ConstructorParamsInputSwitchProps<
	ActionType extends ConstructorStepItemAction
> {
	action: NonNullable<ActionType>;
	initialValue?: ConstructorStepItemParams<NonNullable<ActionType>>;
	onChange: (
		params: ConstructorStepItemParams<NonNullable<ActionType>>
	) => void;
}

const ParamsInput = <ActionType extends ConstructorStepItemAction>(
	props: ConstructorParamsInputSwitchProps<ActionType>
): JSXElement => {
	const changeHandler: ConstructorStepParamsChangeHandler<
		NonNullable<ActionType>
	> = (params) => {
		props.onChange(
			params as ConstructorStepItemParams<NonNullable<ActionType>>
		);
	};

	return (
		<Dynamic
			component={getActionParamsComponents(props.action)}
			onChange={changeHandler}
			action={props.action}
			params={props.initialValue}
		/>
	);
};

export { ParamsInput };
