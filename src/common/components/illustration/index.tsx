import { Component } from "solid-js";

import { getAsset } from "../../utils";
import { ILLUSTRATION_NAME_TO_PATH, IllustrationName } from "./constants";
import styles from "./index.module.scss";

interface IllustrationProps {
	name: IllustrationName;
}

const Illustration: Component<IllustrationProps> = (props) => {
	return (
		<div class={styles.illustration}>
			<img
				src={getAsset(ILLUSTRATION_NAME_TO_PATH[props.name])}
				alt={props.name}
			/>
		</div>
	);
};

export { Illustration };
