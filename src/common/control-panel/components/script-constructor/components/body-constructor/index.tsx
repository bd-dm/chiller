import { Button, Column, Icon, IconName, Row } from "common/components";
import { Component, Show } from "solid-js";

import { useScriptConstructor } from "../../context";
import { BodyConstructorSection } from "../body-constructor-section";
import { SectionSteps } from "../section-steps";
import { SectionVariables } from "../section-variables";
import styles from "./index.module.scss";

const VariablesConstructorSection: Component = () => {
	const { variables, addVariable } = useScriptConstructor();

	return (
		<>
			<Show when={variables().length === 0}>
				<Row horizontalAlignment={Row.Alignment.Horizontal.Stretch}>
					<Button light onClick={addVariable}>
						<Icon name={IconName.Add} /> &nbsp; Create variable
					</Button>
				</Row>
			</Show>
			<Show when={variables().length > 0}>
				<BodyConstructorSection title={"Variables"}>
					<Column
						classList={{ [styles.section]: true }}
						horizontalAlignment={Column.Alignment.Horizontal.Stretch}
					>
						<SectionVariables />
					</Column>
				</BodyConstructorSection>
			</Show>
		</>
	);
};

const StepsConstructorSection: Component = () => {
	const { steps, addStep } = useScriptConstructor();

	return (
		<>
			<Show when={steps.length === 0}>
				<Row horizontalAlignment={Row.Alignment.Horizontal.Stretch}>
					<Button light onClick={addStep}>
						<Icon name={IconName.Add} /> &nbsp; Create step
					</Button>
				</Row>
			</Show>
			<Show when={steps.length > 0}>
				<BodyConstructorSection title={"Steps"}>
					<Column
						classList={{ [styles.section]: true }}
						horizontalAlignment={Column.Alignment.Horizontal.Stretch}
					>
						<SectionSteps />
					</Column>
				</BodyConstructorSection>
			</Show>
		</>
	);
};

const BodyConstructor: Component = () => {
	return (
		<Column
			class={styles.constructor}
			horizontalAlignment={Column.Alignment.Horizontal.Stretch}
		>
			<VariablesConstructorSection />
			<StepsConstructorSection />
		</Column>
	);
};

export { BodyConstructor };
