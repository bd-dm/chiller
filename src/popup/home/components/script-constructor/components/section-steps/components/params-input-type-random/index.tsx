import { Component } from "solid-js";

import { ConstructorParamsInputProps } from "../../../../types";

const variantsToString = (variants: string[] | undefined = []): string =>
	variants.join(",");
const stringToVariants = (string: string): string[] =>
	string.split(",").map((item) => item.trim());

const ParamsInputTypeRandom: Component<
	ConstructorParamsInputProps<"typeRandom">
> = (props) => {
	const changeHandler = (newParam: string) => {
		props.onChange({
			...props.params,
			variants: stringToVariants(newParam),
		});
	};

	return (
		<input
			type="text"
			placeholder={"Variants separated by comma (,)"}
			value={variantsToString(props.params?.variants)}
			onInput={({ currentTarget: { value } }) => changeHandler(value)}
		/>
	);
};

export { ParamsInputTypeRandom };
