import { Component } from "solid-js";
import { Column, Row } from "../../../../../../../../common/components";
import styles from "./index.module.scss";
import { useScriptConstructor } from "../../../../context";
import { StepInputItem } from "../../../../types";

interface StepsItemProps {
	index: number;
}

const StepsItem: Component<StepsItemProps> = (props) => {
	const { steps, setStep } = useScriptConstructor();
	const step = () => steps()[props.index];
	const action = () => step().action;
	const params = () => step().params;

	const changeHandler =
		(key: keyof StepInputItem) => (data: StepInputItem[typeof key]) => {
			setStep(props.index, {
				action: action(),
				params: params(),
				...{ [key]: data },
			});
		};

	return (
		<Column
			horizontalAlignment={Column.Alignment.Horizontal.Stretch}
			classList={{ [styles.item]: true }}
		>
			<h4 class={styles.title}>Step {props.index + 1}</h4>
			<select class={styles.input}>
				<option disabled hidden selected value="">
					Select action...
				</option>
				<option value="sleep">Sleep</option>
			</select>
		</Column>
	);
};

export { StepsItem };
