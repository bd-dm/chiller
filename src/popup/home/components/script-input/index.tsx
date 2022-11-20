import { Component, createSignal } from "solid-js";
import { nanoid } from "nanoid";
import { Column } from "../../../../common/components";
import styles from "./index.module.scss";
import { Script } from "../../../../common/scripts/types";

interface ScriptInput {
	values?: {
		name?: string;
		json?: string;
		id?: string;
	};
	onResult?: (result: Script) => void;
}

const ScriptInput: Component<ScriptInput> = (props) => {
	// eslint-disable-next-line solid/reactivity
	const [name, setName] = createSignal(props.values?.name ?? "");
	// eslint-disable-next-line solid/reactivity
	const [json, setJson] = createSignal(props.values?.json ?? "");

	const addScriptHandler = async () => {
		if (!props.onResult) {
			return;
		}

		props.onResult({
			id: props.values?.id ?? nanoid(),
			name: name(),
			json: json(),
			addedTimestamp: new Date().getTime(),
		});
	};

	return (
		<Column
			classList={{ [styles.block]: true }}
			horizontalAlignment={Column.Alignment.Horizontal.Stretch}
		>
			<input
				type="text"
				placeholder={"Name"}
				value={name()}
				onInput={({ currentTarget: { value } }) => setName(value)}
			/>
			<textarea
				class={styles.scriptInput}
				placeholder={"Script JSON"}
				value={json()}
				onInput={({ currentTarget: { value } }) => setJson(value)}
			/>
			<button type={"button"} onClick={addScriptHandler}>
				Save
			</button>
		</Column>
	);
};

export { ScriptInput };
