import { Column, Row } from "common/components";
import { JSXElement, ParentComponent } from "solid-js";

import styles from "./index.module.scss";

interface BodyConstructorSectionProps {
	title: string;
	headerContent?: JSXElement;
}

const BodyConstructorSection: ParentComponent<BodyConstructorSectionProps> = (
	props
) => {
	return (
		<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch} gapLess>
			<Row
				horizontalAlignment={Row.Alignment.Horizontal.SpaceBetween}
				verticalAlignment={Row.Alignment.Vertical.Center}
			>
				<div class={styles.title}>{props.title}</div>
				{props.headerContent}
			</Row>
			<div class={styles.body}>{props.children}</div>
		</Column>
	);
};

export { BodyConstructorSection };
