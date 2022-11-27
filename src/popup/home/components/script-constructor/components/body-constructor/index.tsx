import { Component } from "solid-js";
import { Button, Column } from "../../../../../../common";
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
				headerContent={<Button onClick={addVariable}>+</Button>}
			>
				<SectionVariables />
			</BodyConstructorSection>
			<BodyConstructorSection
				title={"Steps"}
				headerContent={<Button onClick={addStep}>+</Button>}
			>
				<SectionSteps />
			</BodyConstructorSection>
		</Column>
	);
};

export { BodyConstructor };
