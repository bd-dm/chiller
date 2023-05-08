import { Column } from "common/components";
import { isUndefined } from "lodash-es";
import { Component, createSignal, For, onMount } from "solid-js";
import Sortable from "sortablejs";

import { useScriptConstructor } from "../../context";
import { StepsItem } from "./components";
import styles from "./components/steps-item/index.module.scss";

const SectionSteps: Component = () => {
	const [listRef, setListRef] = createSignal<HTMLUListElement>();
	const { steps, moveStep } = useScriptConstructor();

	const startSortable = () => {
		const list = listRef();
		if (!list) {
			return;
		}

		Sortable.create(list, {
			sort: true,
			animation: 150,
			handle: `.${styles.dragHandle}`,
			direction: "vertical",
			onUpdate: function ({ oldIndex, newIndex }) {
				if (!isUndefined(oldIndex) && !isUndefined(newIndex)) {
					moveStep(oldIndex, newIndex);
				}
			},
		});
	};

	onMount(() => {
		startSortable();
	});

	return (
		<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
			<ul>
				<Column
					horizontalAlignment={Column.Alignment.Horizontal.Stretch}
					ref={setListRef}
				>
					<For each={steps()}>
						{(step, index) => (
							<li>
								<StepsItem step={step} index={index()} />
							</li>
						)}
					</For>
				</Column>
			</ul>
		</Column>
	);
};

export { SectionSteps };
