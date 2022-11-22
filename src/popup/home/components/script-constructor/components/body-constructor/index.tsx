import { Component } from "solid-js";
import { Column } from "../../../../../../common/components";
import { BodyConstructorSection } from "../body-constructor-section";
import { SectionVariables } from "../section-variables";
import { SectionSteps } from "../section-steps";

const BodyConstructor: Component = () => {
	return (
		<Column>
			<BodyConstructorSection>
				<SectionVariables />
			</BodyConstructorSection>
			<BodyConstructorSection>
				<SectionSteps />
			</BodyConstructorSection>
		</Column>
	);
};

export { BodyConstructor };
