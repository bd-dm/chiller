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

const ParamsInputType: Component<ActionParamsComponentProps> = (props) => {
	const changeHandler: ActionParamChangeHandler = (newParam) => {
		props.onChange({
			...props.params,
			text: newParam,
		});
	};

	return (
		<>
			<ParamsInputCommon
				availableOptions={[ActionParamType.Variable, ActionParamType.Text]}
				param={props.params?.text as ActionParam | undefined}
				onChange={changeHandler}
			/>
		</>
	);
};

export { ParamsInputType };
