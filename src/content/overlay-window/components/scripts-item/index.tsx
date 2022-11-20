import { Component } from "solid-js";
import { Script } from "../../../../common/scripts/types";
import { Row } from "../../../../common/components";
import styles from "./index.module.scss";
import { scriptRunner } from "../../../../common";
import { useCoreContext } from "../../../contexts";

interface ScriptsItemProps {
	script: Script;
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
				<button type={"button"} onClick={runScriptHandler}>
					Run
				</button>
			</Row>
		</li>
	);
};

export { ScriptsItem };
