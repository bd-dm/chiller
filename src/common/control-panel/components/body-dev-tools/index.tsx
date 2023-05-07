import { Component } from "solid-js";

import { Column } from "../../../components";
import { BetaMark } from "../beta-mark";
import { ButtonsRow } from "../buttons-row";
import { Navigation } from "../navigation";
import styles from "./index.module.scss";

const BodyDevTools: Component = () => {
	return (
		<Column
			classList={{ [styles.devToolsBody]: true, chiller: true }}
			verticalAlignment={Column.Alignment.Vertical.SpaceBetween}
			horizontalAlignment={Column.Alignment.Horizontal.Stretch}
		>
			<ButtonsRow />
			<Navigation />
			<BetaMark />
		</Column>
	);
};

export { BodyDevTools };
