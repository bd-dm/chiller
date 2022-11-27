import { ActionDynamicParamType } from "common/user-events";
import { Component, JSXElement } from "solid-js";

import {
	ConstructorParamsInputProps,
	ConstructorStepParamChangeHandler,
} from "../../../../types";
import { ParamsInputDynamic } from "../params-input-dynamic";

const ParamsInputClick: Component<ConstructorParamsInputProps<"click">> = (
	props
): JSXElement => {
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
				ActionDynamicParamType.Selector,
			]}
			param={props.params?.target}
			onChange={changeHandler}
		/>
	);
};

export { ParamsInputClick };
