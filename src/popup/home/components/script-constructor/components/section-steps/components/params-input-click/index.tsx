import { Component } from "solid-js";
import {
	ActionParamChangeHandler,
	ActionParamsComponentProps,
} from "../../../../types";
import { ParamsInputCommon } from "../params-input-common";
import {
	ActionParam,
	ActionParamType,
} from "../../../../../../../../common/user-events/types";

const ParamsInputClick: Component<ActionParamsComponentProps> = (props) => {
	const changeHandler: ActionParamChangeHandler = (newParam) => {
		props.onChange({
			...props.params,
			target: newParam,
		});
	};

	return (
		<>
			<ParamsInputCommon
				availableOptions={[ActionParamType.Variable, ActionParamType.Selector]}
				param={props.params?.target as ActionParam | undefined}
				onChange={changeHandler}
			/>
		</>
	);
};

export { ParamsInputClick };
