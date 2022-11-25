import { Component } from "solid-js";
import { Select } from "../../../../../../../../common/components";
import { ActionParamWithVariable } from "../../../../../../../../common/user-events/types";
import { useScriptConstructor } from "../../../../context";
import { InputExactTypeProps } from "./types";

const InputVariable: Component<InputExactTypeProps<ActionParamWithVariable>> = (
	props
) => {
	const { variables } = useScriptConstructor();

	const variablesOptions = () =>
		variables()
			.filter(({ name, value }) => {
				return name.trim().length > 0 && value.trim().length > 0;
			})
			.map(({ name }) => ({ value: name, name }));

	const hasVariables = () => variablesOptions().length > 0;

	return (
		<Select
			placeholder={
				hasVariables() ? "Select variable..." : "First add variables"
			}
			initialValue={props.param.use}
			onChange={(value) => props.onChange("use")(value)}
			disabled={!hasVariables()}
			options={variablesOptions()}
		/>
	);
};

export { InputVariable };
