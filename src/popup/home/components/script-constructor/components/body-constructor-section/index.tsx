import { ParentComponent } from "solid-js/types/render/component";
import { Column } from "../../../../../../common/components";
import styles from "./index.module.scss";

interface BodyConstructorSectionProps {
	title: string;
}

const BodyConstructorSection: ParentComponent<BodyConstructorSectionProps> = (
	props
) => {
	return (
		<Column
			horizontalAlignment={Column.Alignment.Horizontal.Stretch}
			classList={{ [styles.section]: true }}
			gapLess={true}
		>
			<div class={styles.title}>{props.title}</div>
			<div class={styles.body}>{props.children}</div>
		</Column>
	);
};

export { BodyConstructorSection };
