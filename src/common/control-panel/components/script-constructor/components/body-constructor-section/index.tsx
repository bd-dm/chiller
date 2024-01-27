import { Column } from "common/components";
import { nanoid } from "nanoid";
import { ParentComponent } from "solid-js";

import styles from "./index.module.scss";

interface BodyConstructorSectionProps {
	title: string;
}

const BodyConstructorSection: ParentComponent<BodyConstructorSectionProps> = (
	props
) => {
	const titleId = nanoid();

	return (
		<fieldset aria-labelledby={titleId}>
			<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch} gapLess>
				<h2 id={titleId} class={styles.title}>
					{props.title}
				</h2>
				<div class={styles.body}>{props.children}</div>
			</Column>
		</fieldset>
	);
};

export { BodyConstructorSection };
