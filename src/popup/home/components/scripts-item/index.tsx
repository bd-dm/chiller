import { Component, createSignal, Show } from "solid-js";
import styles from "./index.module.scss";
import commonStyles from "../../../../common/styles/index.module.scss";
import { Script } from "../../../../common/scripts/types";
import { removeScript, updateScript } from "../../../../common";
import { useHomeContext } from "../../context";
import { ScriptInput } from "../script-input";
import { Column, Row } from "../../../../common/components";

interface ScriptsItemProps {
	script: Script;
}

const ScriptsItem: Component<ScriptsItemProps> = (props) => {
	const [isEdit, setIsEdit] = createSignal(false);
	const { updateScripts, setIsAddScriptOpened } = useHomeContext();

	const removeHandler = async () => {
		await removeScript(props.script.id);
		updateScripts();
	};

	const editHandler = async () => {
		setIsEdit(!isEdit());
	};

	const saveHandler = async (script: Script) => {
		await updateScript(script);
		setIsAddScriptOpened(false);
		updateScripts();
	};

	return (
		<li class={styles.item}>
			<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
				<Row
					classList={{ [styles.row]: true }}
					horizontalAlignment={Row.Alignment.Horizontal.SpaceBetween}
					verticalAlignment={Row.Alignment.Vertical.Center}
				>
					<div>{props.script.name}</div>
					<Row>
						<button
							type={"button"}
							classList={{ [commonStyles.active]: isEdit() }}
							onClick={editHandler}
						>
							Edit
						</button>
						<button type={"button"} onClick={removeHandler}>
							&times;
						</button>
					</Row>
				</Row>
				<Show keyed when={isEdit()}>
					<ScriptInput values={props.script} onResult={saveHandler} />
				</Show>
			</Column>
		</li>
	);
};

export { ScriptsItem };
