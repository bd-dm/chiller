import { Component } from "solid-js";
import { ActionParamsChangeHandler, StepInputItem } from "../../../../types";
import { Dynamic } from "solid-js/web";
import { getActionParamsComponents } from "../../../../action-variants";

interface ParamsInputProps {
	action: NonNullable<StepInputItem["action"]>;
	initialValue?: StepInputItem["params"];
	onChange: (params: StepInputItem["params"]) => void;
}

const ParamsInput: Component<ParamsInputProps> = (props) => {
	const changeHandler: ActionParamsChangeHandler = (params) => {
		props.onChange(params);
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
