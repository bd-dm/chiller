import { Component, Match, Switch } from "solid-js";

import {
	ActionDynamicParam,
	ActionDynamicParamType,
	ActionDynamicParamWithSelector,
	ActionDynamicParamWithText,
	ActionDynamicParamWithVariable,
	Row,
	Select,
} from "@/common";

import { ConstructorStepParamChangeHandler } from "../../../../types";
import styles from "./index.module.scss";
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
	[ActionDynamicParamType.Variable]: "With variable",
	[ActionDynamicParamType.Text]: "Text",
	[ActionDynamicParamType.Selector]: "CSS selector",
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
		<Row>
			<div class={styles.input}>
				<Select
					placeholder={"Select input type..."}
					initialValue={initialType()}
					onChange={changeHandler("type")}
					options={typeOptions()}
				/>
			</div>
			<div class={styles.input}>
				<Switch
					fallback={
						<input type="text" disabled placeholder={"[Not available]"} />
					}
				>
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
				</Switch>
			</div>
		</Row>
	);
};

export { ParamsInputDynamic };
