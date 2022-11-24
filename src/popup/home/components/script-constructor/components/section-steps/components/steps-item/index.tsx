import { Component } from "solid-js";
import { Column, Select } from "../../../../../../../../common/components";
import styles from "./index.module.scss";
import { useScriptConstructor } from "../../../../context";
import { ActionOption, StepInputItem } from "../../../../types";
import { actionOptions } from "../../../../constants";

interface StepsItemProps {
	index: number;
}

const StepsItem: Component<StepsItemProps> = (props) => {
	const { steps, setStep } = useScriptConstructor();
	const step = () => steps()[props.index];
	const action = () => step().action;
	const params = () => step().params;

	const changeHandler =
		(key: keyof StepInputItem) => (data: StepInputItem[typeof key] | null) => {
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
			<Select<ActionOption>
				placeholder={"Select action..."}
				onChange={changeHandler("action")}
				initialValue={action()}
				options={actionOptions}
			/>
		</Column>
	);
};

export { StepsItem };
