import { Component } from "solid-js";

import { Row } from "../row";
import styles from "./index.module.scss";

const EmptyScripts: Component = () => (
	<Row
		classList={{ [styles.block]: true }}
		horizontalAlignment={Row.Alignment.Horizontal.Center}
	>
		No scripts yet. <br />
		To add a script, go to "Create new" tab
	</Row>
);

export { EmptyScripts };
