import { Component, ComponentProps } from "solid-js";

import { Icon } from "../icon";
import styles from "./index.module.scss";

const InlineIcon: Component<ComponentProps<typeof Icon>> = (props) => {
	return (
		<span class={styles.inlineIcon}>
			<Icon {...props} />
		</span>
	);
};

export { InlineIcon };
