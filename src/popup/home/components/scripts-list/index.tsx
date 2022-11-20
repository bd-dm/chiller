import { Component, For } from "solid-js";
import styles from "./index.module.scss";
import { useHomeContext } from "../../context";
import { ScriptsItem } from "../scripts-item";

const ScriptsList: Component = () => {
	const { scripts } = useHomeContext();

	return (
		<ul class={styles.list}>
			<For each={scripts()}>{(script) => <ScriptsItem script={script} />}</For>
		</ul>
	);
};

export { ScriptsList };
