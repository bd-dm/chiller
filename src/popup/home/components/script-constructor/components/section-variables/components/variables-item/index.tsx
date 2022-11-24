import { Component } from "solid-js";
import { Row } from "../../../../../../../../common/components";
import styles from "./index.module.scss";
import { useScriptConstructor } from "../../../../context";
import { VariableInputItem } from "../../../../types";

interface VariablesItemProps {
	index: number;
}

const VariablesItem: Component<VariablesItemProps> = (props) => {
	const { variables, setVariable } = useScriptConstructor();
	const variable = () => variables()[props.index];
	const name = () => variable().name ?? "";
	const value = () => variable().value ?? "";

	const changeHandler = (key: keyof VariableInputItem) => (data: string) => {
		setVariable(props.index, {
			name: name(),
			value: value(),
			...{ [key]: data },
		});
	};

	return (
		<Row>
			<input
				class={styles.input}
				type="text"
				name={"name"}
				value={name()}
				placeholder={"Variable name"}
				onInput={({ currentTarget: { value: newName } }) =>
					changeHandler("name")(newName)
				}
			/>
			<input
				class={styles.input}
				type="text"
				name={"Value"}
				value={value()}
				placeholder={"value"}
				onInput={({ currentTarget: { value: newValue } }) =>
					changeHandler("value")(newValue)
				}
			/>
		</Row>
	);
};

export { VariablesItem };
