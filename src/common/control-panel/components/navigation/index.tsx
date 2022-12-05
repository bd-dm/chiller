import { Component, Match, Switch } from "solid-js";

import { useControlPanelContext } from "../../context";
import { Page } from "../../enums";
import { AddScript } from "../add-script";
import { ScriptImport } from "../script-import";
import { ScriptsList } from "../scripts-list";
import styles from "./index.module.scss";

const Navigation: Component = () => {
	const { page } = useControlPanelContext();

	return (
		<section role={"main"} aria-label={page()} class={styles.scripts}>
			<Switch>
				<Match keyed when={page() === Page.AddScript}>
					<AddScript />
				</Match>
				<Match keyed when={page() === Page.ScriptList}>
					<ScriptsList />
				</Match>
				<Match keyed when={page() === Page.ImportScript}>
					<ScriptImport />
				</Match>
			</Switch>
		</section>
	);
};

export { Navigation };
