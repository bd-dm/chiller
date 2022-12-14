import { Column } from "common/components";
import { Component } from "solid-js";

import { BodyConstructorSection } from "../body-constructor-section";
import { SectionSteps } from "../section-steps";
import { SectionVariables } from "../section-variables";
import styles from "./index.module.scss";

const BodyConstructor: Component = () => {
	return (
		<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
			<BodyConstructorSection title={"Variables"}>
				<Column
					classList={{ [styles.section]: true }}
					horizontalAlignment={Column.Alignment.Horizontal.Stretch}
				>
					<SectionVariables />
				</Column>
			</BodyConstructorSection>
			<BodyConstructorSection title={"Steps"}>
				<Column
					classList={{ [styles.section]: true }}
					horizontalAlignment={Column.Alignment.Horizontal.Stretch}
				>
					<SectionSteps />
				</Column>
			</BodyConstructorSection>
		</Column>
	);
};

export { BodyConstructor };
