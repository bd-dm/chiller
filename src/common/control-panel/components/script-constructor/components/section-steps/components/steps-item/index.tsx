import { Button, Column, Icon, IconName, Row, Select } from "common/components";
import { isUndefined } from "lodash-es";
import { nanoid } from "nanoid";
import {
	Component,
	createEffect,
	createSignal,
	JSXElement,
	onCleanup,
	onMount,
	Show,
} from "solid-js";

import { actionOptions } from "../../../../action-variants";
import { useScriptConstructor } from "../../../../context";
import {
	ConstructorStepActionOption,
	ConstructorStepItem,
} from "../../../../types";
import { isParamsFilled } from "../../utils";
import { ParamsInput } from "../params-input";
import { Collapsed } from "./components";
import styles from "./index.module.scss";

interface StepsItemProps {
	index?: number;
	step: ConstructorStepItem;
	dragHandle?: JSXElement;
}

const StepsItem: Component<StepsItemProps> = (props) => {
	const { setStep, removeStep, steps } = useScriptConstructor();
	const [parentRef, setParentRef] = createSignal<HTMLElement>();
	const [isCollapsed, setIsCollapsed] = createSignal(false);
	const titleId = nanoid();

	const isLast = () => props.index === steps.length - 1;

	const isFirst = () => props.index === 0;

	const isStepFinished = () => {
		const action = props.step.action;
		const params = props.step.params;

		const isActionFinished = !isUndefined(action);
		const isParamsFinished = isParamsFilled(action, params);

		return isActionFinished && isParamsFinished;
	};

	const collapseIfFinished = () => {
		if (isStepFinished()) {
			setIsCollapsed(true);
		}
	};

	const handleExpand = () => {
		pauseCollapsingIfFinished();
		setIsCollapsed(false);
	};

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

	const onFocusOut = (event: FocusEvent) => {
		if (parentRef()?.contains(event.relatedTarget as Node)) {
			return;
		}

		collapseIfFinished();
	};

	const pauseCollapsingIfFinished = () => {
		parentRef()?.removeEventListener("focusout", onFocusOut);

		setTimeout(() => {
			parentRef()?.addEventListener("focusout", onFocusOut);
		}, 100);
	};

	onMount(() => {
		parentRef()?.addEventListener("focusout", onFocusOut);

		collapseIfFinished();
	});

	onCleanup(() => {
		parentRef()?.removeEventListener("focusout", onFocusOut);
	});

	createEffect(() => {
		if (!isStepFinished()) {
			setIsCollapsed(false);
		}
	});

	return (
		<Row aria-labelledby={titleId} ref={setParentRef}>
			<Column
				horizontalAlignment={Column.Alignment.Horizontal.Stretch}
				classList={{
					[styles.item]: true,
					[styles.last]: isLast(),
				}}
			>
				<Row
					aria-hidden
					horizontalAlignment={Row.Alignment.Horizontal.SpaceBetween}
					verticalAlignment={Row.Alignment.Vertical.Center}
				>
					{props.dragHandle}
					<h4 id={titleId} class={styles.title}>
						{!isUndefined(props.index) ? props.index + 1 : ""}
					</h4>
					<Row style={{ flex: "1" }}>
						<Show when={isCollapsed()}>
							{props.step.action && props.step.params && (
								<Collapsed
									action={props.step.action}
									params={props.step.params}
									onExpand={handleExpand}
								/>
							)}
						</Show>
						<Show when={!isCollapsed()}>
							<div class={styles.descriptionPlaceholder}>
								Choose action for this step
							</div>
						</Show>
					</Row>
					<Show when={hasRemoveButton()}>
						<Row verticalAlignment={Row.Alignment.Vertical.Center}>
							<Button light onClick={removeHandler}>
								<Icon name={IconName.Close} />
							</Button>
						</Row>
					</Show>
				</Row>
				<Show when={!isCollapsed()}>
					<Column
						horizontalAlignment={Column.Alignment.Horizontal.Stretch}
						classList={{
							[styles.inputs]: true,
						}}
					>
						<Select<ConstructorStepActionOption>
							placeholder={"Action"}
							onChange={changeHandler("action")}
							initialValue={props.step.action}
							options={actionOptions}
						/>
						<Show when={props.step.action}>
							<ParamsInput
								action={props.step.action!}
								initialValue={props.step.params}
								onChange={changeHandler("params")}
							/>
						</Show>
					</Column>
				</Show>
			</Column>
		</Row>
	);
};

export { StepsItem };
