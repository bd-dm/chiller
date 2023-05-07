import { Component } from "solid-js";

import { Column } from "../../../components";
import styles from "../../index.module.scss";
import { BetaMark } from "../beta-mark";
import { ButtonsRow } from "../buttons-row";
import { Navigation } from "../navigation";

const BodyPopup: Component = () => {
	return (
		<Column classList={{ [styles.popup]: true, ["chiller"]: true }}>
			<ButtonsRow />
			<Navigation />
			<BetaMark />
		</Column>
	);
};

export { BodyPopup };
