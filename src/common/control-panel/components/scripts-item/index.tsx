import { Button, Column, Icon, IconName, Row } from "common/components";
import {
	exportScript,
	removeScript,
	ScriptData,
	updateScript,
} from "common/scripts";
import { Component, createSignal, Show } from "solid-js";

import { useControlPanelContext } from "../../context";
import { Page } from "../../enums";
import { ScriptConstructor } from "../script-constructor";
import styles from "./index.module.scss";

interface ScriptsItemProps {
	script: ScriptData;
}

const ScriptsItem: Component<ScriptsItemProps> = (props) => {
	const [isEdit, setIsEdit] = createSignal(false);
	const { updateScripts, setPage } = useControlPanelContext();

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
		setIsEdit(false);
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
					<Row gapLess>
						<Button type={"button"} light onClick={exportHandler}>
							<Icon name={IconName.Download} title={"Download"} />
						</Button>
						<Button
							type={"button"}
							light
							active={isEdit()}
							onClick={editHandler}
						>
							<Icon name={IconName.Edit} title={"Edit"} />
						</Button>
						<Button light type={"button"} onClick={removeHandler}>
							<Icon name={IconName.Close} title={"Remove"} />
						</Button>
					</Row>
				</Row>
				<Show keyed when={isEdit()}>
					<ScriptConstructor
						isEdit={true}
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
