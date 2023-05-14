import { Component } from "solid-js";

import { Column } from "../../../components";
import { BetaMark } from "../beta-mark";
import { ButtonsRow } from "../buttons-row";
import { Navigation } from "../navigation";
import { OverlayButton } from "../overlay-button";
import styles from "./index.module.scss";

const Body: Component = () => {
	return (
		<Column
			horizontalAlignment={Column.Alignment.Horizontal.Stretch}
			class={styles.body}
		>
			<div class={styles.buttons}>
				<ButtonsRow />
			</div>
			<Navigation />
			<Column
				horizontalAlignment={Column.Alignment.Horizontal.Stretch}
				classList={{ [styles.footer]: true }}
			>
				<OverlayButton />
				<BetaMark />
			</Column>
		</Column>
	);
};

export { Body };
