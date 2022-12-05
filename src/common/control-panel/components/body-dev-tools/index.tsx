import { Component } from "solid-js";

import { Column } from "../../../components";
import { BetaMark } from "../beta-mark";
import { ButtonsRow } from "../buttons-row";
import { Navigation } from "../navigation";
import styles from "./index.module.scss";

const BodyDevTools: Component = () => {
	return (
		<Column
			class={styles.devToolsBody}
			verticalAlignment={Column.Alignment.Vertical.SpaceBetween}
			horizontalAlignment={Column.Alignment.Horizontal.Stretch}
		>
			<div class={"chiller"}>
				<ButtonsRow />
				<Navigation />
			</div>
			<BetaMark />
		</Column>
	);
};

export { BodyDevTools };
