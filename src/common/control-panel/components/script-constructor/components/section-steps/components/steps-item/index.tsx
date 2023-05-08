import {
	Button,
	Column,
	Icon,
	IconName,
	InputLight,
	Row,
	Select,
} from "common/components";
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
	const { setStep, removeStep, steps, moveStepUp, moveStepDown } =
		useScriptConstructor();
	const titleId = nanoid();

	const isLast = () => props.index === steps().length - 1;

	const isFirst = () => props.index === 0;

	const hasRemoveButton = () => !isLast() || isFirst();

	const isMovableDown = () => props.index < steps().length - 2;
	const isMovableUp = () => props.index > 0;
	const isMovable = () => isMovableDown() || isMovableUp();

	const hasControls = () => hasRemoveButton() || isMovable();

	const changeHandler =
		(key: keyof ConstructorStepItem) =>
		(data: ConstructorStepItem[typeof key] | null) => {
			setStep(props.index, {
				...props.step,
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
					verticalAlignment={Row.Alignment.Vertical.Center}
				>
					<h4 id={titleId} class={styles.title}>
						Step {props.index + 1}
					</h4>
					<InputLight
						classList={{ [styles.name]: true }}
						onInput={({ currentTarget: { value } }) =>
							changeHandler("name")(value)
						}
						value={props.step.name ?? ""}
						placeholder={"Step name [optional]"}
					/>
					<Show when={hasControls()} keyed>
						<Row verticalAlignment={Row.Alignment.Vertical.Center}>
							<Show when={isMovable()} keyed>
								<Column gapLess classList={{ [styles.mover]: true }}>
									<Show when={isMovableUp()} keyed fallback={<div />}>
										<button
											onClick={() => moveStepUp(props.index)}
											class={styles.arrow}
											type={"button"}
										>
											▲
										</button>
									</Show>
									<Show when={isMovableDown()} keyed fallback={<div />}>
										<button
											onClick={() => moveStepDown(props.index)}
											class={styles.arrow}
											type={"button"}
										>
											▼
										</button>
									</Show>
								</Column>
							</Show>
							<Show when={hasRemoveButton()} keyed>
								<Button light onClick={removeHandler}>
									<Icon name={IconName.Close} />
								</Button>
							</Show>
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
