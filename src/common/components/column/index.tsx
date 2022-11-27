import { JSX, ParentComponent } from "solid-js";

import styles from "./index.module.scss";

enum ColumnVerticalAlignment {
	FlexStart = "FlexStart",
	Center = "Center",
	FlexEnd = "FlexEnd",
	SpaceBetween = "SpaceBetween",
}

enum ColumnHorizontalAlignment {
	FlexStart = "FlexStart",
	Center = "Center",
	FlexEnd = "FlexEnd",
	Stretch = "Stretch",
}

interface ColumnProps extends JSX.HTMLAttributes<HTMLDivElement> {
	classList?: Record<string, boolean | undefined>;
	verticalAlignment?: ColumnVerticalAlignment;
	horizontalAlignment?: ColumnHorizontalAlignment;
	gapLess?: boolean;
}

interface ColumnInterface extends ParentComponent<ColumnProps> {
	Alignment: {
		Horizontal: typeof ColumnHorizontalAlignment;
		Vertical: typeof ColumnVerticalAlignment;
	};
}

const Column: ColumnInterface = (props) => {
	return (
		<div
			{...props}
			classList={{
				[styles.column]: true,
				[styles.gapLess]: props.gapLess,
				[styles[
					`horizontal${
						props.horizontalAlignment ?? ColumnHorizontalAlignment.FlexStart
					}`
				]]: true,
				[styles[
					`vertical${
						props.verticalAlignment ?? ColumnVerticalAlignment.FlexStart
					}`
				]]: true,
				...(props.classList ?? {}),
			}}
		>
			{props.children}
		</div>
	);
};

Column.Alignment = {
	Horizontal: ColumnHorizontalAlignment,
	Vertical: ColumnVerticalAlignment,
};

export { Column };
