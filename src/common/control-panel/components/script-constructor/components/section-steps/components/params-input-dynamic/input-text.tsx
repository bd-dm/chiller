import { Input } from "common/components";
import { ActionDynamicParamWithText } from "common/user-events";
import { Component } from "solid-js";

import { InputExactTypeProps } from "./types";

const InputText: Component<InputExactTypeProps<ActionDynamicParamWithText>> = (
	props,
) => {
	return (
		<Input
			type="text"
			placeholder={"Text"}
			value={props.param.text ?? ""}
			onInput={({ currentTarget: { value } }) => props.onChange("text")(value)}
		/>
	);
};

export { InputText };
