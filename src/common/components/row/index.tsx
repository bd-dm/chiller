import { JSX, ParentComponent } from "solid-js";

import styles from "./index.module.scss";

enum RowVerticalAlignment {
	FlexStart = "FlexStart",
	Center = "Center",
	FlexEnd = "FlexEnd",
	Stretch = "Stretch",
}

enum RowHorizontalAlignment {
	FlexStart = "FlexStart",
	Center = "Center",
	FlexEnd = "FlexEnd",
	SpaceBetween = "SpaceBetween",
	Stretch = "Stretch",
}

interface RowProps extends JSX.HTMLAttributes<HTMLDivElement> {
	classList?: Record<string, boolean | undefined>;
	verticalAlignment?: RowVerticalAlignment;
	horizontalAlignment?: RowHorizontalAlignment;
}

interface RowInterface extends ParentComponent<RowProps> {
	Alignment: {
		Horizontal: typeof RowHorizontalAlignment;
		Vertical: typeof RowVerticalAlignment;
	};
}

const Row: RowInterface = (props) => {
	return (
		<div
			{...props}
			role={"row"}
			classList={{
				[styles.row]: true,
				[styles[
					`horizontal${
						props.horizontalAlignment ?? RowHorizontalAlignment.FlexStart
					}`
				]]: true,
				[styles[
					`vertical${props.verticalAlignment ?? RowVerticalAlignment.FlexStart}`
				]]: true,
				...(props.classList ?? {}),
			}}
		>
			{props.children}
		</div>
	);
};

Row.Alignment = {
	Horizontal: RowHorizontalAlignment,
	Vertical: RowVerticalAlignment,
};

export { Row };
