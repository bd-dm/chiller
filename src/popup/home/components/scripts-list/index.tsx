import { Component, For } from "solid-js";
import styles from "../scripts/index.module.scss";
import { useHomeContext } from "../../context";

const ScriptsList: Component = () => {
	const { scripts } = useHomeContext();

	return (
		<ul class={styles.list}>
			<For each={scripts()}>{({ name }) => <li>{name}</li>}</For>
		</ul>
	);
};

export { ScriptsList };
