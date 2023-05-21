import { Component } from "solid-js";

import { Column } from "../../../components";
import commonStyles from "../../index.module.scss";
import { Body } from "../body";

const BodyPopup: Component = () => {
	return (
		<Column
			classList={{ [commonStyles.popup]: true, ["chiller"]: true }}
			horizontalAlignment={Column.Alignment.Horizontal.Stretch}
		>
			<Body />
		</Column>
	);
};

export { BodyPopup };
