import { Component, Index } from "solid-js";

import { Column } from "@/common";

import { useScriptConstructor } from "../../context";
import { VariablesItem } from "./components";

const SectionVariables: Component = () => {
	const { variables } = useScriptConstructor();

	return (
		<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
			<Index each={variables()}>
				{(variable, index) => (
					<VariablesItem variable={variable()} index={index} />
				)}
			</Index>
		</Column>
	);
};

export { SectionVariables };
