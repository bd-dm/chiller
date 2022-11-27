import { Component } from "solid-js";
import { ActionDynamicParamWithText } from "../../../../../../../../common";
import { InputExactTypeProps } from "./types";

const InputText: Component<InputExactTypeProps<ActionDynamicParamWithText>> = (
	props
) => {
	return (
		<input
			type="text"
			placeholder={"Text"}
			value={props.param.text ?? ""}
			onInput={({ currentTarget: { value } }) => props.onChange("text")(value)}
		/>
	);
};

export { InputText };
