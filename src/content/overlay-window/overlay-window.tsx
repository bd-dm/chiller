import Draggabilly from "draggabilly";
import { Component, createSignal, onMount } from "solid-js";

import { Button, Icon, IconName, Row } from "../../common/components";
import { ScriptsList } from "./components";
import styles from "./index.module.scss";

const OverlayWindow: Component = () => {
	const [ref, setRef] = createSignal<HTMLDivElement>();
	const [isCollapsed, setIsCollapsed] = createSignal(false);

	onMount(() => {
		const element = ref();
		if (!element) {
			return;
		}

		new Draggabilly(element, { handle: `.${styles.drag}` });
	});

	const handleCollapseClick = () => {
		setIsCollapsed(!isCollapsed());
	};

	return (
		<div class={styles.positioner}>
			<div
				ref={setRef}
				classList={{
					[styles.overlay]: true,
					[styles.collapsed]: isCollapsed(),
					chiller: true,
				}}
			>
				<Row
					classList={{ [styles.header]: true }}
					horizontalAlignment={Row.Alignment.Horizontal.SpaceBetween}
					verticalAlignment={Row.Alignment.Vertical.Center}
				>
					<Button light classList={{ [styles.drag]: true }}>
						<Icon name={IconName.DragHandle} />
					</Button>
					<h3>Scripts</h3>
					<Button light onClick={handleCollapseClick}>
						<Icon name={isCollapsed() ? IconName.Expand : IconName.Collapse} />
					</Button>
				</Row>
				<div class={styles.content}>
					<ScriptsList />
				</div>
			</div>
		</div>
	);
};

export { OverlayWindow };
