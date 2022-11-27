import { Component } from "solid-js";
import styles from "./index.module.scss";
import { BodyConstructor, NameInput, SaveButton } from "./components";
import { ScriptConstructorContext } from "./context";
import { Column } from "../../../../common";
import { ScriptConstructorProps } from "./types";

const ScriptConstructor: Component<ScriptConstructorProps> = (props) => {
	return (
		<ScriptConstructorContext.Provider
			scriptId={props.scriptId}
			onResult={() => props.onResult}
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
