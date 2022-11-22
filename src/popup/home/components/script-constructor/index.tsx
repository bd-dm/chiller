import { Component } from "solid-js";
import { Column } from "../../../../common/components";
import styles from "./index.module.scss";
import { BodyConstructor, NameInput } from "./components";
import { ScriptConstructorContext } from "./context";
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
				<NameInput />
				<BodyConstructor />
			</Column>
		</ScriptConstructorContext.Provider>
	);
};

export { ScriptConstructor };
