import { Component, Show } from "solid-js";
import { Column, Select } from "../../../../../../../../common/components";
import styles from "./index.module.scss";
import { ActionOption, StepInputItem } from "../../../../types";
import { actionOptions } from "../../../../constants";
import { ParamsInput } from "../params-input";
import { useScriptConstructor } from "../../../../context";

interface StepsItemProps {
	index: number;
	step: StepInputItem;
}

const StepsItem: Component<StepsItemProps> = (props) => {
	const { setStep } = useScriptConstructor();

	const changeHandler =
		(key: keyof StepInputItem) => (data: StepInputItem[typeof key] | null) => {
			setStep(props.index, {
				action: props.step.action,
				params: props.step.params,
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
				initialValue={props.step.action}
				options={actionOptions}
			/>
			<Show when={props.step.action} keyed>
				<ParamsInput action={props.step.action} />
			</Show>
		</Column>
	);
};

export { StepsItem };
