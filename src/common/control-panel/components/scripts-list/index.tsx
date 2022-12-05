import { EmptyScripts } from "common/components";
import { Component, For } from "solid-js";

import { useControlPanelContext } from "../../context";
import { ScriptsItem } from "../scripts-item";
import styles from "./index.module.scss";

const ScriptsList: Component = () => {
	const { scripts } = useControlPanelContext();

	return (
		<ul class={styles.list}>
			<For each={scripts()} fallback={<EmptyScripts />}>
				{(script) => <ScriptsItem script={script} />}
			</For>
		</ul>
	);
};

export { ScriptsList };
