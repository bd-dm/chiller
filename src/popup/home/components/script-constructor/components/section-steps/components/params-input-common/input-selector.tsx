import { Component } from "solid-js";
import { ActionParamWithSelector } from "../../../../../../../../common/user-events/types";
import { InputExactTypeProps } from "./types";

const InputSelector: Component<InputExactTypeProps<ActionParamWithSelector>> = (
	props
) => {
	return (
		<input
			type="text"
			placeholder={"Selector"}
			value={props.param.selector ?? ""}
			onInput={({ currentTarget: { value } }) =>
				props.onChange("selector")(value)
			}
		/>
	);
};

export { InputSelector };
