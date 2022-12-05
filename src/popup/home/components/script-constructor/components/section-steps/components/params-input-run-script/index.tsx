import { Component } from "solid-js";

import { ActionDynamicParamType } from "../../../../../../../../common/user-events";
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
			script: newParam,
		});
	};

	return (
		<ParamsInputDynamic
			availableOptions={[
				ActionDynamicParamType.Variable,
				ActionDynamicParamType.Script,
			]}
			param={props.params?.script}
			onChange={changeHandler}
		/>
	);
};

export { ParamsInputRunScript };
