import { Component, Match, Switch } from "solid-js";

import { useHomeContext } from "../../context";
import { Page } from "../../enums";
import { AddScript } from "../add-script";
import { ScriptsList } from "../scripts-list";
import styles from "./index.module.scss";

const Scripts: Component = () => {
	const { page } = useHomeContext();

	return (
		<section role={"main"} class={styles.scripts}>
			<Switch>
				<Match keyed when={page() === Page.AddScript}>
					<AddScript />
				</Match>
				<Match keyed when={page() === Page.ScriptList}>
					<ScriptsList />
				</Match>
			</Switch>
		</section>
	);
};

export { Scripts };
