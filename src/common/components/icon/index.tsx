import { Component } from "solid-js";

import styles from "./index.module.scss";

enum IconName {
	Upload = "upload",
	Download = "download",
	Edit = "edit",
	Overlay = "layers",
	Add = "add_circle",
	List = "list",
	Close = "close",
	Collapse = "close_fullscreen",
	Expand = "expand_content",
	DragHandle = "drag_handle",
	DragHandle2 = "drag_indicator",
	Play = "play_arrow",
	Variable = "variables",
	Text = "text_fields",
	Css = "css",
	Javascript = "javascript",
	Click = "left_click",
	Keyboard = "keyboard",
	Wait = "hourglass_empty",
	Backspace = "backspace",
	Sleep = "sleep",
}

interface IconProps {
	name: IconName;
	title?: string;
}

const Icon: Component<IconProps> = (props) => {
	// @ts-ignore - TS doesn't know about computed styles
	const iconStyle = () => styles[`icon-${props.name}`];

	return (
		<span
			title={props.title}
			classList={{
				"material-symbols-rounded": true,
				[iconStyle()]: true,
			}}
		>
			{props.name}
		</span>
	);
};

export { Icon, IconName };
