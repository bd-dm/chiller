import { Component, createEffect, Index } from "solid-js";
import { Column } from "../../../../../../common/components";
import { useScriptConstructor } from "../../context";
import { StepsItem } from "./components";

const SectionSteps: Component = () => {
	const { steps } = useScriptConstructor();

	createEffect(() => console.log(steps()));

	return (
		<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
			<Index each={steps()}>
				{(step, index) => <StepsItem step={step()} index={index} />}
			</Index>
		</Column>
	);
};

export { SectionSteps };
