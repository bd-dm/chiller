import { Button, Column, Row } from "common/components";
import {
	exportScript,
	removeScript,
	ScriptData,
	updateScript,
} from "common/scripts";
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

	const exportHandler = async () => {
		await exportScript(props.script.id);
	};

	const saveHandler = async (script: ScriptData) => {
		await updateScript(script);
		updateScripts();
		onFinish();
	};

	const onFinish = () => {
		setPage(Page.ScriptList);
	};

	return (
		<li class={styles.item}>
			<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
				<Row
					classList={{ [styles.row]: true }}
					aria-label={props.script.name}
					horizontalAlignment={Row.Alignment.Horizontal.SpaceBetween}
					verticalAlignment={Row.Alignment.Vertical.Center}
				>
					<div>{props.script.name}</div>
					<Row>
						<Button
							type={"button"}
							light
							active={isEdit()}
							onClick={exportHandler}
						>
							Export
						</Button>
						<Button
							type={"button"}
							light
							active={isEdit()}
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
						onSave={saveHandler}
						onCancel={onFinish}
					/>
				</Show>
			</Column>
		</li>
	);
};

export { ScriptsItem };
