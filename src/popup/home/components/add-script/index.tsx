import { Component, createSignal, Show } from "solid-js";
import styles from "./index.module.scss";
import { addScript } from "../../../../common/scripts";
import { nanoid } from "nanoid";
import { useHomeContext } from "../../context";

const AddScript: Component = () => {
	const [isOpened, setIsOpened] = createSignal(false);
	const [name, setName] = createSignal("");
	const [json, setJson] = createSignal("");
	const { updateScripts } = useHomeContext();

	const toggleAddScript = () => setIsOpened(!isOpened());

	const addScriptHandler = async () => {
		await addScript({
			id: nanoid(),
			name: name(),
			json: json(),
			addedTimestamp: new Date().getTime(),
		});
		setIsOpened(false);
		updateScripts();
	};

	return (
		<div class={styles["add-script-block"]}>
			<Show keyed when={isOpened()}>
				<input
					type="text"
					placeholder={"Name"}
					onInput={({ currentTarget: { value } }) => setName(value)}
				/>
				<input
					type="text"
					placeholder={"Script JSON"}
					onInput={({ currentTarget: { value } }) => setJson(value)}
				/>
				<button type={"button"} onClick={addScriptHandler}>
					Add
				</button>
			</Show>
			<button type={"button"} onClick={toggleAddScript}>
				{isOpened() ? "Cancel" : "Add script"}
			</button>
		</div>
	);
};

export { AddScript };
