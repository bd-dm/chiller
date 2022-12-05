import Draggabilly from "draggabilly";
import { Component, createSignal, onMount } from "solid-js";

import { ScriptsList } from "./components";
import styles from "./index.module.scss";

const OverlayWindow: Component = () => {
	const [ref, setRef] = createSignal<HTMLDivElement>();

	onMount(() => {
		const element = ref();
		if (!element) {
			return;
		}

		new Draggabilly(element, { handle: `.${styles.header}` });
	});

	return (
		<div class={styles.positioner}>
			<div ref={setRef} classList={{ [styles.overlay]: true, chiller: true }}>
				<h3 class={styles.header}>Chiller scripts</h3>
				<div class={styles.content}>
					<ScriptsList />
				</div>
			</div>
		</div>
	);
};

export { OverlayWindow };
