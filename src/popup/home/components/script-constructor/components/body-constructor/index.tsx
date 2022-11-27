import { Button, Column } from "common/components";
import { Component } from "solid-js";

import { useScriptConstructor } from "../../context";
import { BodyConstructorSection } from "../body-constructor-section";
import { SectionSteps } from "../section-steps";
import { SectionVariables } from "../section-variables";
import styles from "./index.module.scss";

const BodyConstructor: Component = () => {
	const { addVariable, addStep } = useScriptConstructor();

	return (
		<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
			<BodyConstructorSection title={"Variables"}>
				<Column>
					<Column
						classList={{ [styles.section]: true }}
						horizontalAlignment={Column.Alignment.Horizontal.Stretch}
					>
						<SectionVariables />
					</Column>
					<Button onClick={addVariable}>+</Button>
				</Column>
			</BodyConstructorSection>
			<BodyConstructorSection title={"Steps"}>
				<Column>
					<Column
						classList={{ [styles.section]: true }}
						horizontalAlignment={Column.Alignment.Horizontal.Stretch}
					>
						<SectionSteps />
					</Column>
					<Button onClick={addStep}>+</Button>
				</Column>
			</BodyConstructorSection>
		</Column>
	);
};

export { BodyConstructor };
