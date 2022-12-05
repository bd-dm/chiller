import { EmptyScripts } from "common/components";
import { Component, For } from "solid-js";

import { useCoreContext } from "../../../context";
import { ScriptsItem } from "../scripts-item";
import styles from "./index.module.scss";

const ScriptsList: Component = () => {
	const { scripts } = useCoreContext();

	return (
		<ul class={styles.list}>
			<For each={scripts()} fallback={<EmptyScripts />}>
				{(script) => <ScriptsItem script={script} />}
			</For>
		</ul>
	);
};

export { ScriptsList };
