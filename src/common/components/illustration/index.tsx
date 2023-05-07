import { ILLUSTRATION_NAME_TO_PATH, IllustrationName } from "./constants";
import styles from "./index.module.scss";

interface IllustrationProps {
	name: IllustrationName;
}

const Illustration = (props: IllustrationProps) => {
	return (
		<div class={styles.illustration}>
			<img src={ILLUSTRATION_NAME_TO_PATH[props.name]} alt={props.name} />
		</div>
	);
};

export { Illustration };
