import { Button, Column, Row, Select } from "common/components";
import { nanoid } from "nanoid";
import { Component, Show } from "solid-js";

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
	const { setStep, removeStep, steps } = useScriptConstructor();
	const titleId = nanoid();

	const isLast = () => props.index === steps().length - 1;

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
		<Row aria-labelledby={titleId}>
			<Column
				horizontalAlignment={Column.Alignment.Horizontal.Stretch}
				classList={{ [styles.item]: true, [styles.last]: isLast() }}
			>
				<Row
					aria-hidden
					horizontalAlignment={Row.Alignment.Horizontal.SpaceBetween}
				>
					<h4 id={titleId} class={styles.title}>
						Step {props.index + 1}
					</h4>
					<Show when={!isLast()} keyed>
						<Button light onClick={removeHandler}>
							&times;
						</Button>
					</Show>
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
		</Row>
	);
};

export { StepsItem };
