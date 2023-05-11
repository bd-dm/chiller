import {
	closestCenter,
	createSortable,
	DragDropProvider,
	DragDropSensors,
	DragEventHandler,
	DragOverlay,
	Id,
	SortableProvider,
} from "@thisbeyond/solid-dnd";
import { Column } from "common/components";
import {
	Component,
	ComponentProps,
	createSignal,
	For,
	Index,
	Show,
} from "solid-js";

import { useScriptConstructor } from "../../context";
import { StepsItem } from "./components";
import styles from "./index.module.scss";

const SortableStepsItem: Component<ComponentProps<typeof StepsItem>> = (
	props
) => {
	const getSortable = () => createSortable(props.step.id);
	const sortable = getSortable();

	return (
		<div
			use:sortable
			classList={{
				[styles.activeDraggingElement]: sortable.isActiveDraggable,
			}}
		>
			<StepsItem step={props.step} index={props.index} />
		</div>
	);
};

const SectionSteps: Component = () => {
	const { steps, setSteps } = useScriptConstructor();

	const [activeItem, setActiveItem] = createSignal<Id | null>(null);

	const ids = () => steps().map((step) => step.id);

	const getStep = (id: Id | null) => steps().find((step) => step.id === id);

	const activeStep = () => getStep(activeItem());

	const onDragStart: DragEventHandler = ({ draggable }) =>
		setActiveItem(draggable.id);

	const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
		if (draggable && droppable) {
			const currentItems = ids();
			const fromIndex = currentItems.indexOf(draggable.id as string);
			const toIndex = currentItems.indexOf(droppable.id as string);

			if (fromIndex !== toIndex) {
				const updatedItems = currentItems.slice();
				updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
				setSteps(updatedItems.map((id) => getStep(id)!));
			}
		}
	};

	return (
		<DragDropProvider
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			collisionDetector={closestCenter}
		>
			<DragDropSensors />
			<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
				<SortableProvider ids={ids()}>
					<For each={steps()}>
						{(step, index) => <SortableStepsItem index={index()} step={step} />}
					</For>
				</SortableProvider>
			</Column>
			<DragOverlay class={"chiller"}>
				<Show when={activeStep()}>
					<StepsItem step={activeStep()!} />
				</Show>
			</DragOverlay>
		</DragDropProvider>
	);
};

export { SectionSteps };
