import { Column } from "common/components";
import { ActionDynamicParamType } from "common/user-events";
import { WAIT_FOR_ELEMENT_TIMEOUT } from "common/user-events/events";
import { Component, JSXElement } from "solid-js";

import {
	ConstructorParamsInputProps,
	ConstructorStepParamChangeHandler,
} from "../../../../types";
import { ParamsInputDynamic } from "../params-input-dynamic";

const ParamsInputWaitForElement: Component<
	ConstructorParamsInputProps<"waitForElement">
> = (props): JSXElement => {
	const targetChangeHandler: ConstructorStepParamChangeHandler = (newParam) => {
		props.onChange({
			...props.params,
			target: newParam,
		});
	};

	const timeoutChangeHandler = (value: string) => {
		props.onChange({
			...props.params,
			target: parseInt(value, 10),
		});
	};

	return (
		<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
			<ParamsInputDynamic
				availableOptions={[
					ActionDynamicParamType.Variable,
					ActionDynamicParamType.Selector,
				]}
				param={props.params?.target}
				onChange={targetChangeHandler}
			/>
			<input
				type="text"
				placeholder={"Variants separated by comma (,)"}
				value={props.params?.timeout ?? WAIT_FOR_ELEMENT_TIMEOUT}
				onInput={({ currentTarget: { value } }) => timeoutChangeHandler(value)}
			/>
		</Column>
	);
};

export { ParamsInputWaitForElement };
