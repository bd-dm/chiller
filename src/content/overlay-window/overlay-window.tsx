import { Component } from "solid-js";

import { ScriptsList } from "./components";
import styles from "./index.module.scss";

const OverlayWindow: Component = () => {
	return (
		<div classList={{ [styles.overlay]: true, chiller: true }}>
			<ScriptsList />
		</div>
	);
};

export { OverlayWindow };
