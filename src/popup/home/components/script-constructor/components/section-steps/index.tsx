import { Component, For } from "solid-js";
import { Column } from "../../../../../../common/components";
import { useScriptConstructor } from "../../context";
import { StepsItem } from "./components";

const SectionSteps: Component = () => {
	const { steps } = useScriptConstructor();

	return (
		<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
			<For each={steps()}>{(_, index) => <StepsItem index={index()} />}</For>
		</Column>
	);
};

export { SectionSteps };
