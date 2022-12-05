import { Column, Row } from "common/components";
import { nanoid } from "nanoid";
import { JSXElement, ParentComponent } from "solid-js";

import styles from "./index.module.scss";

interface BodyConstructorSectionProps {
	title: string;
	headerContent?: JSXElement;
}

const BodyConstructorSection: ParentComponent<BodyConstructorSectionProps> = (
	props
) => {
	const titleId = nanoid();

	return (
		<fieldset aria-labelledby={titleId}>
			<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch} gapLess>
				<Row
					horizontalAlignment={Row.Alignment.Horizontal.SpaceBetween}
					verticalAlignment={Row.Alignment.Vertical.Center}
				>
					<div id={titleId} class={styles.title}>
						{props.title}
					</div>
					{props.headerContent}
				</Row>
				<div class={styles.body}>{props.children}</div>
			</Column>
		</fieldset>
	);
};

export { BodyConstructorSection };
