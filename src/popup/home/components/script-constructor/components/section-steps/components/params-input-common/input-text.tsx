import { Component } from "solid-js";
import { ActionParamWithText } from "../../../../../../../../common/user-events/types";
import { InputExactTypeProps } from "./types";

const InputText: Component<InputExactTypeProps<ActionParamWithText>> = (
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
