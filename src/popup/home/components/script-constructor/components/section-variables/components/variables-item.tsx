import { Component, createEffect, createSignal, onMount } from "solid-js";
import { Row } from "../../../../../../../common/components";
import { isUndefined } from "lodash-es";

interface VariableInputItem {
	name: string;
	value: string;
}

interface VariablesItemProps {
	initialValues?: VariableInputItem;
	onChange?: (item: VariableInputItem) => void;
}

const VariablesItem: Component<VariablesItemProps> = (props) => {
	const [name, setName] = createSignal("");
	const [value, setValue] = createSignal("");

	onMount(() => {
		if (!isUndefined(props.initialValues)) {
			setName(props.initialValues.name);
			setValue(props.initialValues.value);
		}
	});

	createEffect(() => {
		if (!isUndefined(props.onChange)) {
			props.onChange({ name: name(), value: value() });
		}
	});

	return (
		<Row>
			<input
				type="text"
				name={"name"}
				onInput={({ currentTarget: { value } }) => setName(value)}
			/>
			<input
				type="text"
				name={"value"}
				onInput={({ currentTarget: { value } }) => setValue(value)}
			/>
		</Row>
	);
};

export { VariablesItem };
