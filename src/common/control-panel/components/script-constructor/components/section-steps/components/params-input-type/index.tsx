import { ActionDynamicParamType } from "common/user-events";
import { Component } from "solid-js";

import {
	ConstructorParamsInputProps,
	ConstructorStepParamChangeHandler,
} from "../../../../types";
import { ParamsInputDynamic } from "../params-input-dynamic";

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
			defaultParamType={ActionDynamicParamType.Text}
			param={props.params?.text}
			onChange={changeHandler}
		/>
	);
};

export { ParamsInputType };
