import { Component } from "solid-js";

import { Button } from "../button";
import { Icon, IconName } from "../icon";
import styles from "./index.module.scss";

interface MenuButtonProps {
	onClick: () => void;
	icon: IconName;
	children?: string;
	active?: boolean;
}

const MenuButton: Component<MenuButtonProps> = (props) => {
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
