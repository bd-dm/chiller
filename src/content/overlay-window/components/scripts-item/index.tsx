import { Button, Icon, IconName, Row } from "common/components";
import { ScriptData, scriptRunner } from "common/scripts";
import { Component } from "solid-js";

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
				horizontalAlignment={Row.Alignment.Horizontal.FlexStart}
				verticalAlignment={Row.Alignment.Vertical.Center}
			>
				<Button light type={"button"} onClick={runScriptHandler}>
					<Icon name={IconName.Play} />
				</Button>
				<div class={styles.name}>{props.script.name}</div>
			</Row>
		</li>
	);
};

export { ScriptsItem };
