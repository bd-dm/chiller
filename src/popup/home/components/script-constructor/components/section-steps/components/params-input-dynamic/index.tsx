import { Input, Row, Select } from "common/components";
import {
	ActionDynamicParam,
	ActionDynamicParamType,
	ActionDynamicParamWithScript,
	ActionDynamicParamWithSelector,
	ActionDynamicParamWithText,
	ActionDynamicParamWithVariable,
} from "common/user-events";
import { Component, Match, Switch } from "solid-js";

import { ConstructorStepParamChangeHandler } from "../../../../types";
import styles from "./index.module.scss";
import { InputScript } from "./input-script";
import { InputSelector } from "./input-selector";
import { InputText } from "./input-text";
import { InputVariable } from "./input-variable";
import { ChangeHandler } from "./types";

interface ParamsInputCommonProps {
	param?: ActionDynamicParam;
	availableOptions: ActionDynamicParamType[];
	onChange: ConstructorStepParamChangeHandler;
}

const ParamTypeNames: Record<ActionDynamicParamType, string> = {
	[ActionDynamicParamType.Variable]: "From variable",
	[ActionDynamicParamType.Text]: "Text",
	[ActionDynamicParamType.Selector]: "CSS selector",
	[ActionDynamicParamType.Script]: "Text",
};

const ParamsInputDynamic: Component<ParamsInputCommonProps> = (props) => {
	const changeHandler: ChangeHandler = (key) => (value) => {
		props.onChange({
			...props.param,
			[key]: value,
		} as ActionDynamicParam);
	};

	const typeOptions = () =>
		props.availableOptions.map((option) => ({
			value: option,
			name: ParamTypeNames[option],
		}));

	const initialType = () => props.param?.type ?? undefined;

	return (
		<Row verticalAlignment={Row.Alignment.Vertical.Stretch}>
			<div class={styles.input}>
				<Select
					placeholder={"Select input type..."}
					initialValue={initialType()}
					onChange={changeHandler("type")}
					options={typeOptions()}
				/>
			</div>
			<div class={styles.input}>
				<Switch fallback={<Input type="text" disabled />}>
					<Match
						when={props.param?.type === ActionDynamicParamType.Variable}
						keyed
					>
						<InputVariable
							param={props.param as ActionDynamicParamWithVariable}
							onChange={changeHandler}
						/>
					</Match>
					<Match
						when={props.param?.type === ActionDynamicParamType.Selector}
						keyed
					>
						<InputSelector
							param={props.param as ActionDynamicParamWithSelector}
							onChange={changeHandler}
						/>
					</Match>
					<Match when={props.param?.type === ActionDynamicParamType.Text} keyed>
						<InputText
							param={props.param as ActionDynamicParamWithText}
							onChange={changeHandler}
						/>
					</Match>
					<Match
						when={props.param?.type === ActionDynamicParamType.Script}
						keyed
					>
						<InputScript
							param={props.param as ActionDynamicParamWithScript}
							onChange={changeHandler}
						/>
					</Match>
				</Switch>
			</div>
		</Row>
	);
};

export { ParamsInputDynamic };
