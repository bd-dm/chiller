import { Button } from "../button";
import { Icon, IconName } from "../icon";
import styles from "./index.module.scss";

interface MenuButtonProps {
	onClick: () => void;
	icon: IconName;
	children?: string;
	active?: boolean;
}

const MenuButton = (props: MenuButtonProps) => {
	return (
		<Button
			light
			type={"button"}
			classList={{
				[styles.button]: true,
			}}
			active={props.active}
			onClick={() => props.onClick()}
		>
			<Icon name={props.icon} />
			<span class={styles.text}>{props.children}</span>
		</Button>
	);
};

export { MenuButton };
