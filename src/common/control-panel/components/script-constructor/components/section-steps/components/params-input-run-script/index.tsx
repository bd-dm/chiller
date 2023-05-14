import { ActionDynamicParamType } from "common/user-events";
import { Component } from "solid-js";

import {
	ConstructorParamsInputProps,
	ConstructorStepParamChangeHandler,
} from "../../../../types";
import { ParamsInputDynamic } from "../params-input-dynamic";

const ParamsInputRunScript: Component<
	ConstructorParamsInputProps<"runScript">
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
				ActionDynamicParamType.Script,
			]}
			defaultParamType={ActionDynamicParamType.Script}
			param={props.params?.target}
			onChange={changeHandler}
		/>
	);
};

export { ParamsInputRunScript };
