import commonStyles from "common/styles/index.module.scss";
import { isEmpty } from "lodash-es";
import { Component, JSX } from "solid-js";

import { Column } from "../column";
import styles from "./index.module.scss";

const Input: Component<JSX.InputHTMLAttributes<HTMLInputElement>> = (props) => {
	return (
		<Column
			horizontalAlignment={Column.Alignment.Horizontal.Stretch}
			data-placeholder={props.placeholder}
			classList={{
				[styles.input]: true,
				[styles.filled]: !isEmpty(props.value),
			}}
		>
			<input
				classList={{
					[commonStyles.inputLike]: true,
				}}
				{...props}
			/>
		</Column>
	);
};

export { Input };
