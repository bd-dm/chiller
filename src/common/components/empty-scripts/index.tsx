import { Component, JSXElement } from "solid-js";

import { Column } from "../column";
import { IconName } from "../icon";
import { Illustration } from "../illustration";
import { IllustrationName } from "../illustration/constants";
import { InlineIcon } from "../inline-icon";
import styles from "./index.module.scss";

interface EmptyScriptsProps {
	message?: JSXElement;
	compact?: boolean;
}

const EmptyScripts: Component<EmptyScriptsProps> = (props) => (
	<Column
		classList={{ [styles.block]: true, [styles.compact]: props.compact }}
		horizontalAlignment={Column.Alignment.Horizontal.Center}
	>
		<Illustration name={IllustrationName.Empty} />
		<h3>
			{props.message ?? (
				<>
					Scripts will be here as soon as you <InlineIcon name={IconName.Add} />
					add them
				</>
			)}
		</h3>
	</Column>
);

export { EmptyScripts };
