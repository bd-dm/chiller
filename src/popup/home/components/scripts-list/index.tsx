import { Component, For } from "solid-js";

import { EmptyScripts } from "@/common";

import { useHomeContext } from "../../context";
import { ScriptsItem } from "../scripts-item";
import styles from "./index.module.scss";

const ScriptsList: Component = () => {
	const { scripts } = useHomeContext();

	return (
		<ul class={styles.list}>
			<For each={scripts()} fallback={<EmptyScripts />}>
				{(script) => <ScriptsItem script={script} />}
			</For>
		</ul>
	);
};

export { ScriptsList };
