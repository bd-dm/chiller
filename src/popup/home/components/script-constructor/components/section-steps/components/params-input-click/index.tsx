import { Component, JSXElement } from "solid-js";
import {
	ConstructorStepParamChangeHandler,
	ConstructorParamsInputProps,
} from "../../../../types";
import { ParamsInputDynamic } from "../params-input-dynamic";
import { ActionDynamicParamType } from "../../../../../../../../common";

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
		<>
			<ParamsInputDynamic
				availableOptions={[
					ActionDynamicParamType.Variable,
					ActionDynamicParamType.Selector,
				]}
				param={props.params?.target}
				onChange={changeHandler}
			/>
		</>
	);
};

export { ParamsInputClick };
