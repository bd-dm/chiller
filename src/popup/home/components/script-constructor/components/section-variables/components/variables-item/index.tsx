import { Component } from "solid-js";
import { Row } from "../../../../../../../../common/components";
import styles from "./index.module.scss";
import { useScriptConstructor } from "../../../../context";
import { VariableInputItem } from "../../../../types";

interface VariablesItemProps {
	index: number;
	variable: VariableInputItem;
}

const VariablesItem: Component<VariablesItemProps> = (props) => {
	const { setVariable } = useScriptConstructor();

	const changeHandler = (key: keyof VariableInputItem) => (data: string) => {
		setVariable(props.index, {
			name: props.variable.name,
			value: props.variable.value,
			...{ [key]: data },
		});
	};

	return (
		<Row>
			<input
				class={styles.input}
				type="text"
				name={"name"}
				value={props.variable.name}
				placeholder={"Variable name"}
				onInput={({ currentTarget: { value: newName } }) =>
					changeHandler("name")(newName)
				}
			/>
			<input
				class={styles.input}
				type="text"
				name={"Value"}
				value={props.variable.value}
				placeholder={"value"}
				onInput={({ currentTarget: { value: newValue } }) =>
					changeHandler("value")(newValue)
				}
			/>
		</Row>
	);
};

export { VariablesItem };
