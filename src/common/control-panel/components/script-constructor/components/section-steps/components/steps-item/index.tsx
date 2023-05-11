import {
	Button,
	Column,
	Icon,
	IconName,
	InputLight,
	Row,
	Select,
} from "common/components";
import { isUndefined } from "lodash-es";
import { nanoid } from "nanoid";
import { Component, JSXElement, Show } from "solid-js";

import { actionOptions } from "../../../../action-variants";
import { useScriptConstructor } from "../../../../context";
import {
	ConstructorStepActionOption,
	ConstructorStepItem,
} from "../../../../types";
import { ParamsInput } from "../params-input";
import styles from "./index.module.scss";

interface StepsItemProps {
	index?: number;
	step: ConstructorStepItem;
	dragHandle?: JSXElement;
}

const StepsItem: Component<StepsItemProps> = (props) => {
	const { setStep, removeStep, steps } = useScriptConstructor();
	const titleId = nanoid();

	const isLast = () => props.index === steps.length - 1;

	const isFirst = () => props.index === 0;

	const hasRemoveButton = () => !isLast() || isFirst();

	const changeHandler =
		(key: keyof ConstructorStepItem) =>
		(data: ConstructorStepItem[typeof key] | null) => {
			setStep(props.step.id, {
				...props.step,
				...{ [key]: data },
			});
		};

	const removeHandler = () => {
		removeStep(props.step.id);
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
					verticalAlignment={Row.Alignment.Vertical.Center}
				>
					{props.dragHandle}
					<h4 id={titleId} class={styles.title}>
						Step {!isUndefined(props.index) ? props.index + 1 : ""}
					</h4>
					<InputLight
						classList={{ [styles.name]: true }}
						onInput={({ currentTarget: { value } }) =>
							changeHandler("name")(value)
						}
						value={props.step.name ?? ""}
						placeholder={"Step name [optional]"}
					/>
					<Show when={hasRemoveButton()} keyed>
						<Row verticalAlignment={Row.Alignment.Vertical.Center}>
							<Button light onClick={removeHandler}>
								<Icon name={IconName.Close} />
							</Button>
						</Row>
					</Show>
				</Row>
				<Select<ConstructorStepActionOption>
					placeholder={"Action"}
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
