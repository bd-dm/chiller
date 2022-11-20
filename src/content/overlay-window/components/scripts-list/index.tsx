import { Component, For } from "solid-js";
import { useCoreContext } from "../../../contexts";
import styles from "./index.module.scss";
import { ScriptsItem } from "../scripts-item";

const ScriptsList: Component = () => {
	const { scripts } = useCoreContext();

	return (
		<ul class={styles.list}>
			<h3>Chiller</h3>
			<For each={scripts()}>{(script) => <ScriptsItem script={script} />}</For>
		</ul>
	);
};

export { ScriptsList };
