import { Component, Match, Switch } from "solid-js";
import { Row, Select } from "../../../../../../../../common/components";
import styles from "./index.module.scss";
import {
	ActionParam,
	ActionParamType,
	ActionParamWithSelector,
	ActionParamWithText,
	ActionParamWithVariable,
} from "../../../../../../../../common/user-events/types";
import { InputVariable } from "./input-variable";
import { ChangeHandler } from "./types";
import { InputSelector } from "./input-selector";
import { InputText } from "./input-text";

type ActionParamChangeHandler = (param: ActionParam) => void;

interface ParamsInputCommonProps {
	param?: ActionParam;
	availableOptions: ActionParamType[];
	onChange: ActionParamChangeHandler;
}

const ParamTypeNames: Record<ActionParamType, string> = {
	[ActionParamType.Variable]: "With variable",
	[ActionParamType.Text]: "Text",
	[ActionParamType.Selector]: "CSS selector",
};

const ParamsInputCommon: Component<ParamsInputCommonProps> = (props) => {
	const changeHandler: ChangeHandler = (key) => (value) => {
		props.onChange({
			...props.param,
			[key]: value,
		} as ActionParam);
	};

	return (
		<Row>
			<div class={styles.input}>
				<Select
					placeholder={"Select input type..."}
					initialValue={props.param?.type ?? undefined}
					onChange={(newType) => changeHandler("type")(newType)}
					options={props.availableOptions.map((option) => ({
						value: option,
						name: ParamTypeNames[option],
					}))}
				/>
			</div>
			<div class={styles.input}>
				<Switch fallback={<input type="text" disabled />}>
					<Match when={props.param?.type === ActionParamType.Variable} keyed>
						<InputVariable
							param={props.param as ActionParamWithVariable}
							onChange={changeHandler}
						/>
					</Match>
					<Match when={props.param?.type === ActionParamType.Selector} keyed>
						<InputSelector
							param={props.param as ActionParamWithSelector}
							onChange={changeHandler}
						/>
					</Match>
					<Match when={props.param?.type === ActionParamType.Text} keyed>
						<InputText
							param={props.param as ActionParamWithText}
							onChange={changeHandler}
						/>
					</Match>
				</Switch>
			</div>
		</Row>
	);
};

export { ParamsInputCommon };
