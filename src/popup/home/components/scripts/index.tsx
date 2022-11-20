import { Component } from "solid-js";
import styles from "./index.module.scss";
import { ScriptsList } from "../scripts-list";
import { AddScript } from "../add-script";

const Scripts: Component = () => {
	return (
		<div class={styles.scripts}>
			<AddScript />
			<ScriptsList />
		</div>
	);
};

export { Scripts };
