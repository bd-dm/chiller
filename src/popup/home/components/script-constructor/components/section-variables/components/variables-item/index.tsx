import { Component } from "solid-js";

import { Row } from "@/common";

import { useScriptConstructor } from "../../../../context";
import { ConstructorVariableItem } from "../../../../types";
import styles from "./index.module.scss";

interface VariablesItemProps {
	index: number;
	variable: ConstructorVariableItem;
}

const VariablesItem: Component<VariablesItemProps> = (props) => {
	const { setVariable } = useScriptConstructor();

	const changeHandler =
		(key: keyof ConstructorVariableItem) => (data: string) => {
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
				placeholder={"Value"}
				onInput={({ currentTarget: { value: newValue } }) =>
					changeHandler("value")(newValue)
				}
			/>
		</Row>
	);
};

export { VariablesItem };
