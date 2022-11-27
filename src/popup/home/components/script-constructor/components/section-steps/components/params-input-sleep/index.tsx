import { Component } from "solid-js";
import { ConstructorParamsInputProps } from "../../../../types";

const ParamsInputSleep: Component<ConstructorParamsInputProps<"sleep">> = (
	props
) => {
	return (
		<input
			type="text"
			placeholder={"Milliseconds"}
			value={props.params?.ms ?? ""}
			onInput={({ currentTarget: { value } }) =>
				props.onChange({
					...props.params,
					ms: value,
				})
			}
		/>
	);
};

export { ParamsInputSleep };
