import { Component } from "solid-js";
import {
	ConstructorStepParamChangeHandler,
	ConstructorParamsInputProps,
} from "../../../../types";
import { ParamsInputDynamic } from "../params-input-dynamic";
import { ActionDynamicParamType } from "../../../../../../../../common";

const ParamsInputType: Component<ConstructorParamsInputProps<"type">> = (
	props
) => {
	const changeHandler: ConstructorStepParamChangeHandler = (newParam) => {
		props.onChange({
			...props.params,
			text: newParam,
		});
	};

	return (
		<ParamsInputDynamic
			availableOptions={[
				ActionDynamicParamType.Variable,
				ActionDynamicParamType.Text,
			]}
			param={props.params?.text}
			onChange={changeHandler}
		/>
	);
};

export { ParamsInputType };
