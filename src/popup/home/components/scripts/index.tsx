import { Component, Match, Switch } from "solid-js";
import styles from "./index.module.scss";
import { ScriptsList } from "../scripts-list";
import { AddScript } from "../add-script";
import { useHomeContext } from "../../context";
import { Page } from "../../enums";

const Scripts: Component = () => {
	const { page } = useHomeContext();

	return (
		<div class={styles.scripts}>
			<Switch>
				<Match keyed when={page() === Page.AddScript}>
					<AddScript />
				</Match>
				<Match keyed when={page() === Page.ScriptList}>
					<ScriptsList />
				</Match>
			</Switch>
		</div>
	);
};

export { Scripts };
