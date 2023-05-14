import { Component } from "solid-js";

import { Column } from "../../../components";
import { Body } from "../body";
import styles from "./index.module.scss";

const BodyDevTools: Component = () => {
	return (
		<Column
			classList={{ [styles.devToolsBody]: true, chiller: true }}
			verticalAlignment={Column.Alignment.Vertical.SpaceBetween}
			horizontalAlignment={Column.Alignment.Horizontal.Stretch}
		>
			<Body />
		</Column>
	);
};

export { BodyDevTools };
