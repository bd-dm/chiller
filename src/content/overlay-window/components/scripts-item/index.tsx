import { Component } from "solid-js";

import { Button, Row, ScriptData, scriptRunner } from "@/common";

import { useCoreContext } from "../../../context";
import styles from "./index.module.scss";

interface ScriptsItemProps {
	script: ScriptData;
}

const ScriptsItem: Component<ScriptsItemProps> = (props) => {
	const { currentTab } = useCoreContext();

	const runScriptHandler = async () => {
		await scriptRunner(currentTab().id, props.script.id);
	};

	return (
		<li class={styles.item}>
			<Row
				horizontalAlignment={Row.Alignment.Horizontal.SpaceBetween}
				verticalAlignment={Row.Alignment.Vertical.Center}
			>
				<div class={styles.name}>{props.script.name}</div>
				<Button type={"button"} onClick={runScriptHandler}>
					Run
				</Button>
			</Row>
		</li>
	);
};

export { ScriptsItem };
