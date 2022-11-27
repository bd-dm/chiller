import { Column, Input } from "common/components";
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
	const timeout = () => props.params?.timeout ?? WAIT_FOR_ELEMENT_TIMEOUT;

	const targetChangeHandler: ConstructorStepParamChangeHandler = (newParam) => {
		props.onChange({
			...props.params,
			target: newParam,
		});
	};

	const timeoutChangeHandler = (value: string) => {
		let newTimeout = parseInt(value, 10);

		if (isNaN(newTimeout)) {
			newTimeout = 0;
		}

		props.onChange({
			...props.params,
			timeout: newTimeout,
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
			<Input
				type="text"
				placeholder={"Timeout (milliseconds)"}
				value={timeout()}
				onInput={({ currentTarget: { value } }) => timeoutChangeHandler(value)}
			/>
		</Column>
	);
};

export { ParamsInputWaitForElement };
