import { createSortable, maybeTransformStyle } from "@thisbeyond/solid-dnd";
import { Component, ComponentProps } from "solid-js";

import { Icon, IconName, Row } from "../../../../../../../components";
import { StepsItem } from "../steps-item";
import styles from "./index.module.scss";

const SortableStepsItem: Component<ComponentProps<typeof StepsItem>> = (
	props
) => {
	const getSortable = () => createSortable(props.step.id);
	const sortable = getSortable();

	return (
		<div
			ref={sortable.ref}
			style={maybeTransformStyle(sortable.transform)}
			classList={{
				[styles.activeDraggingElement]: sortable.isActiveDraggable,
			}}
		>
			<StepsItem
				step={props.step}
				index={props.index}
				dragHandle={
					<Row
						classList={{ [styles.dragHandle]: true }}
						horizontalAlignment={Row.Alignment.Horizontal.Center}
						verticalAlignment={Row.Alignment.Vertical.Center}
						{...sortable.dragActivators}
					>
						<Icon name={IconName.DragHandle2} />
					</Row>
				}
			/>
		</div>
	);
};

export { SortableStepsItem };
