import { Component, For } from "solid-js";
import { Column } from "../../../../../../common/components";
import { VariablesItem } from "./components";
import { useScriptConstructor } from "../../context";

const SectionVariables: Component = () => {
	const { variables } = useScriptConstructor();

	return (
		<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
			<For each={variables()}>
				{(variable, index) => <VariablesItem index={index()} />}
			</For>
		</Column>
	);
};

export { SectionVariables };
