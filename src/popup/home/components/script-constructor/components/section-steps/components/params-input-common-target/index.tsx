import { Component, Match, Switch } from "solid-js";
import { Row, Select } from "../../../../../../../../common/components";
import {
	ActionTarget,
	ActionTargetType,
	SelectorActionTarget,
	VariableActionTarget,
} from "../../../../../../../../common/user-events/action-target";
import styles from "./index.module.scss";
import { useScriptConstructor } from "../../../../context";
import { ActionParamsComponentProps } from "../../../../types";
import { UserEventTargetParams } from "../../../../../../../../common/user-events/types";

const ParamsInputCommonTarget: Component<
	ActionParamsComponentProps<UserEventTargetParams>
> = (props) => {
	const { variables } = useScriptConstructor();

	const changeHandler =
		<
			ActionTargetType extends ActionTarget,
			Key extends keyof ActionTargetType = keyof ActionTargetType
		>(
			field: Key
		) =>
		(value: ActionTargetType[Key]) => {
			const newTarget = { ...props.params?.target, [field]: value };
			props.onChange({
				target: newTarget as ActionTarget,
			});
		};

	const variablesOptions = () =>
		variables()
			.filter(({ name, value }) => {
				return name.trim().length > 0 && value.trim().length > 0;
			})
			.map(({ name }) => ({ value: name, name }));

	const hasVariables = () => variablesOptions().length > 0;

	return (
		<Row>
			<div class={styles.input}>
				<Select
					placeholder={"Select target type..."}
					initialValue={props.params?.target.type}
					onChange={(newType) => changeHandler("type")(newType ?? undefined)}
					options={[
						{ value: ActionTargetType.Variable, name: "Variable" },
						{ value: ActionTargetType.Selector, name: "CSS selector" },
					]}
				/>
			</div>
			<div class={styles.input}>
				<Switch fallback={<input type="text" disabled />}>
					<Match
						when={props.params?.target?.type === ActionTargetType.Variable}
						keyed
					>
						<Select
							placeholder={
								hasVariables() ? "Select variable..." : "First add variables"
							}
							initialValue={(props.params?.target as VariableActionTarget).use}
							onChange={(newVariable) =>
								changeHandler<VariableActionTarget>("use")(
									newVariable ?? undefined
								)
							}
							disabled={!hasVariables()}
							options={variablesOptions()}
						/>
					</Match>
					<Match
						when={props.params?.target.type === ActionTargetType.Selector}
						keyed
					>
						<input
							type="text"
							placeholder={"Selector"}
							value={
								(props.params?.target as SelectorActionTarget).selector ?? ""
							}
							onInput={({ currentTarget: { value } }) =>
								changeHandler<SelectorActionTarget>("selector")(
									value ?? undefined
								)
							}
						/>
					</Match>
				</Switch>
			</div>
		</Row>
	);
};

export { ParamsInputCommonTarget };
