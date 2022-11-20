import { Component } from "solid-js";
import styles from "./index.module.scss";
import { Script } from "../../../../common/scripts/types";
import { Row } from "../../../../common/components";
import { removeScript } from "../../../../common";
import { useHomeContext } from "../../context";

interface ScriptsItemProps {
	script: Script;
}

const ScriptsItem: Component<ScriptsItemProps> = (props) => {
	const { updateScripts } = useHomeContext();

	const removeHandler = async () => {
		await removeScript(props.script.id);
		updateScripts();
	};

	return (
		<li class={styles.item}>
			<Row
				classList={{ [styles.row]: true }}
				horizontalAlignment={Row.Alignment.Horizontal.SpaceBetween}
				verticalAlignment={Row.Alignment.Vertical.Center}
			>
				<div>{props.script.name}</div>
				<button type={"button"} onClick={removeHandler}>
					&times;
				</button>
			</Row>
		</li>
	);
};

export { ScriptsItem };
