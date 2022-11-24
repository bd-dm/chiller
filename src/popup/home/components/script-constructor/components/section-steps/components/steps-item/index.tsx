import { Component } from "solid-js";
import { Column, Select } from "../../../../../../../../common/components";
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
			<Select
				placeholder={"Select action..."}
				onChange={(value) => console.log("changed", value)}
				options={[
					{ value: "sleep", name: "Sleep" },
					{ value: "click", name: "Click" },
					{ value: "waitForElement", name: "Wait for element" },
				]}
			/>
		</Column>
	);
};

export { StepsItem };
