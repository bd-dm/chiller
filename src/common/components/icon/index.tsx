import styles from "./index.module.scss";

enum IconName {
	Upload = "upload",
	Overlay = "layers",
	Add = "add_circle",
	List = "list",
	Close = "close",
}

interface IconProps {
	name: IconName;
	title?: string;
}

const Icon = (props: IconProps) => {
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
