import { Button, Row } from "common/components";
import { Component } from "solid-js";

import { useScriptConstructor } from "../../../../context";
import { ConstructorVariableItem } from "../../../../types";
import styles from "./index.module.scss";

interface VariablesItemProps {
	index: number;
	variable: ConstructorVariableItem;
}

const VariablesItem: Component<VariablesItemProps> = (props) => {
	const { setVariable, removeVariable } = useScriptConstructor();

	const changeHandler =
		(key: keyof ConstructorVariableItem) => (data: string) => {
			setVariable(props.index, {
				name: props.variable.name,
				value: props.variable.value,
				...{ [key]: data },
			});
		};

	const removeHandler = () => {
		removeVariable(props.index);
	};

	return (
		<Row verticalAlignment={Row.Alignment.Vertical.Center}>
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
				placeholder={"Value"}
				onInput={({ currentTarget: { value: newValue } }) =>
					changeHandler("value")(newValue)
				}
			/>
			<Button onClick={removeHandler}>&times;</Button>
		</Row>
	);
};

export { VariablesItem };
