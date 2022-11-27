import { Component } from "solid-js";
import { ConstructorParamsInputProps } from "../../../../types";

const ParamsInputEnterChar: Component<
	ConstructorParamsInputProps<"enterChar">
> = (props) => {
	return (
		<input
			type="text"
			placeholder={"Character"}
			maxLength={1}
			value={props.params?.char ?? ""}
			onInput={({ currentTarget: { value } }) =>
				props.onChange({
					...props.params,
					char: value,
				})
			}
		/>
	);
};

export { ParamsInputEnterChar };
