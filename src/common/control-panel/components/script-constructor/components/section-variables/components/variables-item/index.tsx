import { Button, Icon, IconName, Input, Row } from "common/components";
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

	const isFirst = () => props.index === 0;

	const hasRemoveButton = () => !isLast() || isFirst();

	return (
		<Row
			aria-label={`Variable ${props.index + 1}`}
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
			<Show when={hasRemoveButton()}>
				<Button light onClick={removeHandler}>
					<Icon name={IconName.Close} />
				</Button>
			</Show>
			<Show when={!hasRemoveButton()}>
				<Button disabled classList={{ [styles.buttonPlaceholder]: true }}>
					<Icon name={IconName.Close} />
				</Button>
			</Show>
		</Row>
	);
};

export { VariablesItem };
