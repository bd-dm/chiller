import { Component, createSignal, Show } from "solid-js";
import { addScript } from "../../../../common/scripts";
import { nanoid } from "nanoid";
import { useHomeContext } from "../../context";
import { Column } from "../../../../common/components";
import styles from "./index.module.scss";

const AddScript: Component = () => {
	const [name, setName] = createSignal("");
	const [json, setJson] = createSignal("");
	const { updateScripts, isAddScriptOpened, setIsAddScriptOpened } =
		useHomeContext();

	const addScriptHandler = async () => {
		await addScript({
			id: nanoid(),
			name: name(),
			json: json(),
			addedTimestamp: new Date().getTime(),
		});
		setIsAddScriptOpened(false);
		updateScripts();
	};

	return (
		<Show keyed when={isAddScriptOpened()}>
			<Column
				classList={{ [styles.block]: true }}
				horizontalAlignment={Column.Alignment.Horizontal.Stretch}
			>
				<input
					type="text"
					placeholder={"Name"}
					onInput={({ currentTarget: { value } }) => setName(value)}
				/>
				<textarea
					class={styles.scriptInput}
					placeholder={"Script JSON"}
					onInput={({ currentTarget: { value } }) => setJson(value)}
				/>
				<button type={"button"} onClick={addScriptHandler}>
					Save
				</button>
			</Column>
		</Show>
	);
};

export { AddScript };
