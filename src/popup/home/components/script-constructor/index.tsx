import { isUndefined } from "lodash-es";
import { Component } from "solid-js";

import { Column, ScriptData } from "@/common";

import { BodyConstructor, NameInput, SaveButton } from "./components";
import { ScriptConstructorContext } from "./context";
import styles from "./index.module.scss";
import { ScriptConstructorProps } from "./types";

const ScriptConstructor: Component<ScriptConstructorProps> = (props) => {
	const saveHandler = (result: ScriptData) => {
		if (!isUndefined(props.onResult)) {
			props.onResult(result);
		}
	};

	return (
		<ScriptConstructorContext.Provider
			scriptId={props.scriptId}
			onResult={saveHandler}
		>
			<Column
				classList={{ [styles.block]: true }}
				horizontalAlignment={Column.Alignment.Horizontal.Stretch}
			>
				<h1 class={styles.title}>Add script</h1>
				<NameInput />
				<BodyConstructor />
				<SaveButton />
			</Column>
		</ScriptConstructorContext.Provider>
	);
};

export { ScriptConstructor };
