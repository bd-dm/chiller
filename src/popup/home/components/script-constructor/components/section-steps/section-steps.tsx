import { Column } from "common/components";
import { Component, Index } from "solid-js";

import { useScriptConstructor } from "../../context";
import { StepsItem } from "./components";

const SectionSteps: Component = () => {
	const { steps } = useScriptConstructor();

	return (
		<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
			<Index each={steps()}>
				{(step, index) => <StepsItem step={step()} index={index} />}
			</Index>
		</Column>
	);
};

export { SectionSteps };
