import { Component } from "solid-js";
import { Column } from "../../../../../../common/components";
import { BodyConstructorSection } from "../body-constructor-section";
import { SectionVariables } from "../section-variables";
import { SectionSteps } from "../section-steps";

const BodyConstructor: Component = () => {
	return (
		<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
			<BodyConstructorSection title={"Variables"}>
				<SectionVariables />
			</BodyConstructorSection>
			<BodyConstructorSection title={"Steps"}>
				<SectionSteps />
			</BodyConstructorSection>
		</Column>
	);
};

export { BodyConstructor };
