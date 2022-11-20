import { Component } from "solid-js";
import { Script } from "../../../../common/scripts/types";
import { Row } from "../../../../common/components";
import styles from "./index.module.scss";

interface ScriptsItemProps {
	script: Script;
}

const ScriptsItem: Component<ScriptsItemProps> = (props) => {
	return (
		<li class={styles.item}>
			<Row
				horizontalAlignment={Row.Alignment.Horizontal.SpaceBetween}
				verticalAlignment={Row.Alignment.Vertical.Center}
			>
				<div>{props.script.name}</div>
				<button type={"button"}>Run</button>
			</Row>
		</li>
	);
};

export { ScriptsItem };
