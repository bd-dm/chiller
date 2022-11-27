import { Button, Input, Row } from "common/components";
import { Component, Show } from "solid-js";

import { useScriptConstructor } from "../../../../context";
import { ConstructorVariableItem } from "../../../../types";
import styles from "./index.module.scss";

interface VariablesItemProps {
	index: number;
	variable: ConstructorVariableItem;
}

const VariablesItem: Component<VariablesItemProps> = (props) => {
	const { setVariable, removeVariable, variables } = useScriptConstructor();

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

	const isLast = () => props.index === variables().length - 1;

	return (
		<Row
			verticalAlignment={Row.Alignment.Vertical.Center}
			classList={{ [styles.last]: isLast() }}
		>
			<Input
				class={styles.input}
				type="text"
				name={"name"}
				value={props.variable.name}
				placeholder={"Variable name"}
				onInput={({ currentTarget: { value: newName } }) =>
					changeHandler("name")(newName)
				}
			/>
			<Input
				class={styles.input}
				type="text"
				name={"Value"}
				value={props.variable.value}
				placeholder={"Value"}
				onInput={({ currentTarget: { value: newValue } }) =>
					changeHandler("value")(newValue)
				}
			/>
			<Show when={!isLast()} keyed>
				<Button light onClick={removeHandler}>
					&times;
				</Button>
			</Show>
			<Show when={isLast()} keyed>
				<Button disabled classList={{ [styles.buttonPlaceholder]: true }}>
					&times;
				</Button>
			</Show>
		</Row>
	);
};

export { VariablesItem };
