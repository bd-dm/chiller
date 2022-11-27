import { Component, For } from "solid-js";
import styles from "./index.module.scss";
import { ScriptsItem } from "../scripts-item";
import { EmptyScripts } from "../../../../common";
import { useCoreContext } from "../../../context";

const ScriptsList: Component = () => {
	const { scripts } = useCoreContext();

	return (
		<ul class={styles.list}>
			<h3>Scripts</h3>
			<For each={scripts()} fallback={<EmptyScripts />}>
				{(script) => <ScriptsItem script={script} />}
			</For>
		</ul>
	);
};

export { ScriptsList };
