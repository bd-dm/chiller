import { Component } from "solid-js";

import { Button, Column } from "@/common";

import { useScriptConstructor } from "../../context";
import { BodyConstructorSection } from "../body-constructor-section";
import { SectionSteps } from "../section-steps";
import { SectionVariables } from "../section-variables";

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
