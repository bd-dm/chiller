import { ComponentProps } from "solid-js";

import { Icon } from "../icon";
import styles from "./index.module.scss";

const InlineIcon = (props: ComponentProps<typeof Icon>) => {
	return (
		<span class={styles.inlineIcon}>
			<Icon {...props} />
		</span>
	);
};

export { InlineIcon };
