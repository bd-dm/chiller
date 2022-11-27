import { Component, Show } from "solid-js";

import { Button, Column, Row, Select } from "@/common";

import { actionOptions } from "../../../../action-variants";
import { useScriptConstructor } from "../../../../context";
import {
	ConstructorStepActionOption,
	ConstructorStepItem,
} from "../../../../types";
import { ParamsInput } from "../params-input";
import styles from "./index.module.scss";

interface StepsItemProps {
	index: number;
	step: ConstructorStepItem;
}

const StepsItem: Component<StepsItemProps> = (props) => {
	const { setStep, removeStep } = useScriptConstructor();

	const changeHandler =
		(key: keyof ConstructorStepItem) =>
		(data: ConstructorStepItem[typeof key] | null) => {
			setStep(props.index, {
				action: props.step.action,
				params: props.step.params,
				...{ [key]: data },
			});
		};

	const removeHandler = () => {
		removeStep(props.index);
	};

	return (
		<Column
			horizontalAlignment={Column.Alignment.Horizontal.Stretch}
			classList={{ [styles.item]: true }}
		>
			<Row horizontalAlignment={Row.Alignment.Horizontal.SpaceBetween}>
				<h4 class={styles.title}>Step {props.index + 1}</h4>
				<Button onClick={removeHandler}>&times;</Button>
			</Row>
			<Select<ConstructorStepActionOption>
				placeholder={"Select action..."}
				onChange={changeHandler("action")}
				initialValue={props.step.action}
				options={actionOptions}
			/>
			<Show when={props.step.action} keyed>
				<ParamsInput
					action={props.step.action!}
					initialValue={props.step.params}
					onChange={changeHandler("params")}
				/>
			</Show>
		</Column>
	);
};

export { StepsItem };
