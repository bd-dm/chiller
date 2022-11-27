import { Button, Column, Row } from "common/components";
import { removeScript, ScriptData, updateScript } from "common/scripts";
import commonStyles from "common/styles/index.module.scss";
import { Component, createSignal, Show } from "solid-js";

import { useHomeContext } from "../../context";
import { Page } from "../../enums";
import { ScriptConstructor } from "../script-constructor";
import styles from "./index.module.scss";

interface ScriptsItemProps {
	script: ScriptData;
}

const ScriptsItem: Component<ScriptsItemProps> = (props) => {
	const [isEdit, setIsEdit] = createSignal(false);
	const { updateScripts, setPage } = useHomeContext();

	const removeHandler = async () => {
		await removeScript(props.script.id);
		updateScripts();
	};

	const editHandler = async () => {
		setIsEdit(!isEdit());
	};

	const saveHandler = async (script: ScriptData) => {
		await updateScript(script);
		setPage(Page.ScriptList);
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
						<Button
							type={"button"}
							classList={{ [commonStyles.active]: isEdit() }}
							onClick={editHandler}
						>
							Edit
						</Button>
						<Button type={"button"} onClick={removeHandler}>
							&times;
						</Button>
					</Row>
				</Row>
				<Show keyed when={isEdit()}>
					<ScriptConstructor
						scriptId={props.script.id}
						onResult={saveHandler}
					/>
				</Show>
			</Column>
		</li>
	);
};

export { ScriptsItem };
