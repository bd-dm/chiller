import { Component } from "solid-js";
import { Column } from "../../../../../../common/components";
import { BodyConstructorSection } from "../body-constructor-section";
import { SectionVariables } from "../section-variables";
import { SectionSteps } from "../section-steps";
import { useScriptConstructor } from "../../context";

const BodyConstructor: Component = () => {
	const { addVariable, addStep } = useScriptConstructor();

	return (
		<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
			<BodyConstructorSection
				title={"Variables"}
				headerContent={<button onClick={addVariable}>+</button>}
			>
				<SectionVariables />
			</BodyConstructorSection>
			<BodyConstructorSection
				title={"Steps"}
				headerContent={<button onClick={addStep}>+</button>}
			>
				<SectionSteps />
			</BodyConstructorSection>
		</Column>
	);
};

export { BodyConstructor };
