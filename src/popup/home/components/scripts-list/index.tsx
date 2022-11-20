import { Component, For } from "solid-js";
import styles from "./index.module.scss";
import { useHomeContext } from "../../context";

const ScriptsList: Component = () => {
	const { scripts } = useHomeContext();

	return (
		<ul class={styles.list}>
			<For each={scripts()}>
				{({ name }) => <li class={styles.item}>{name}</li>}
			</For>
		</ul>
	);
};

export { ScriptsList };
