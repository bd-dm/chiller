import { Column } from "common/components";
import { ScriptData } from "common/scripts";
import { isUndefined } from "lodash-es";
import { Component } from "solid-js";

import { BodyConstructor, FinishButtons, NameInput } from "./components";
import { ScriptConstructorContext } from "./context";
import styles from "./index.module.scss";
import { ScriptConstructorProps } from "./types";

const ScriptConstructor: Component<ScriptConstructorProps> = (props) => {
	const saveHandler = (result: ScriptData) => {
		if (!isUndefined(props.onSave)) {
			props.onSave(result);
		}
	};

	return (
		<ScriptConstructorContext.Provider
			scriptId={props.scriptId}
			onSave={saveHandler}
			onCancel={() => props.onCancel && props.onCancel()}
		>
			<Column
				classList={{ [styles.block]: true }}
				horizontalAlignment={Column.Alignment.Horizontal.Stretch}
			>
				<h1 class={styles.title}>
					{props.isEdit ? "Edit" : "Create new"} script
				</h1>
				<NameInput />
				<BodyConstructor />
				<FinishButtons />
			</Column>
		</ScriptConstructorContext.Provider>
	);
};

export { ScriptConstructor };
