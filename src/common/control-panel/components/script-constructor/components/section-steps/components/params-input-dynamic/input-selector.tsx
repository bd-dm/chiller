import { Input } from "common/components";
import { ActionDynamicParamWithSelector } from "common/user-events";
import { Component } from "solid-js";

import { InputExactTypeProps } from "./types";

const InputSelector: Component<
	InputExactTypeProps<ActionDynamicParamWithSelector>
> = (props) => {
	return (
		<Input
			type="text"
			placeholder={"CSS selector"}
			value={props.param.selector ?? ""}
			onInput={({ currentTarget: { value } }) =>
				props.onChange("selector")(value)
			}
		/>
	);
};

export { InputSelector };
