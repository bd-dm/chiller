import { Component } from "solid-js";
import styles from "./index.module.scss";
import commonStyles from "../../common/styles/index.module.scss";
import { ScriptsList } from "./components";

const OverlayWindow: Component = () => {
	return (
		<div classList={{ [styles.overlay]: true, [commonStyles.chiller]: true }}>
			<ScriptsList />
		</div>
	);
};

export { OverlayWindow };
