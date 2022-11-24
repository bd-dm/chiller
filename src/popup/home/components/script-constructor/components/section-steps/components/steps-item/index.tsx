import { Component } from "solid-js";
import { Column, Select } from "../../../../../../../../common/components";
import styles from "./index.module.scss";
import { useScriptConstructor } from "../../../../context";
import { StepInputItem } from "../../../../types";

interface StepsItemProps {
	index: number;
}

interface ActionOption {
	value: NonNullable<StepInputItem["action"]>;
	name: string;
}

const options: ActionOption[] = [
	{ value: "click", name: "Click" },
	{ value: "pressKey", name: "Press Key" },
	{ value: "type", name: "Type string" },
	{ value: "enterChar", name: "Enter char" },
	{ value: "waitForElement", name: "Wait for element" },
	{ value: "clearInput", name: "Clear input" },
	{ value: "sleep", name: "Sleep" },
];

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
				options={options}
			/>
		</Column>
	);
};

export { StepsItem };
