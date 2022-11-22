import { Component, createSignal, onMount } from "solid-js";
import { nanoid } from "nanoid";
import { Column } from "../../../../common/components";
import styles from "./index.module.scss";
import { Script } from "../../../../common/scripts/types";
import { isUndefined } from "lodash-es";

interface ScriptConstructorProps {
	values?: {
		name?: string;
		json?: string;
		id?: string;
	};
	onResult?: (result: Script) => void;
}

const ScriptConstructor: Component<ScriptConstructorProps> = (props) => {
	const [name, setName] = createSignal("");
	const [json, setJson] = createSignal("");

	onMount(() => {
		const initName = props.values?.name;
		const initJson = props.values?.json;

		if (!isUndefined(initName)) {
			setName(initName);
		}
		if (!isUndefined(initJson)) {
			setJson(initJson);
		}
	});

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

export { ScriptConstructor };
