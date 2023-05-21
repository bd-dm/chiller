import { ActionDynamicParamType } from "common/user-events";
import { Component } from "solid-js";

import {
	ConstructorParamsInputProps,
	ConstructorStepParamChangeHandler,
} from "../../../../types";
import { ParamsInputDynamic } from "../params-input-dynamic";

const ParamsInputEnterText: Component<
	ConstructorParamsInputProps<"enterText">
> = (props) => {
	const changeHandler: ConstructorStepParamChangeHandler = (newParam) => {
		props.onChange({
			...props.params,
			target: newParam,
		});
	};

	return (
		<ParamsInputDynamic
			availableOptions={[
				ActionDynamicParamType.Variable,
				ActionDynamicParamType.Text,
			]}
			defaultParamType={ActionDynamicParamType.Text}
			param={props.params?.target}
			onChange={changeHandler}
		/>
	);
};

export { ParamsInputEnterText };
