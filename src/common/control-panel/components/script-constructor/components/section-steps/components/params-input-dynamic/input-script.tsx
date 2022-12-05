import { Input } from "common/components";
import { ActionDynamicParamWithScript } from "common/user-events";
import { Component } from "solid-js";

import { InputExactTypeProps } from "./types";

const InputScript: Component<
	InputExactTypeProps<ActionDynamicParamWithScript>
> = (props) => {
	return (
		<Input
			type="text"
			placeholder={"Text"}
			value={props.param.script ?? ""}
			onInput={({ currentTarget: { value } }) =>
				props.onChange("script")(value)
			}
		/>
	);
};

export { InputScript };
