import { Icon, IconName, Input, Row, Select } from "common/components";
import {
	ActionDynamicParam,
	ActionDynamicParamType,
	ActionDynamicParamWithScript,
	ActionDynamicParamWithSelector,
	ActionDynamicParamWithText,
	ActionDynamicParamWithVariable,
} from "common/user-events";
import { Component, JSXElement, Match, Show, Switch } from "solid-js";

import { useScriptConstructor } from "../../../../context";
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
	defaultParamType?: ActionDynamicParamType;
}

const ParamTypeNames: Record<ActionDynamicParamType, string> = {
	[ActionDynamicParamType.Variable]: "Variable",
	[ActionDynamicParamType.Text]: "Text",
	[ActionDynamicParamType.Selector]: "CSS selector",
	[ActionDynamicParamType.Script]: "Text",
};

const ParamTypeIcons: Record<ActionDynamicParamType, JSXElement> = {
	[ActionDynamicParamType.Variable]: <Icon name={IconName.Variable} />,
	[ActionDynamicParamType.Text]: <Icon name={IconName.Text} />,
	[ActionDynamicParamType.Selector]: <Icon name={IconName.Css} />,
	[ActionDynamicParamType.Script]: <Icon name={IconName.Javascript} />,
};

const ParamsInputDynamic: Component<ParamsInputCommonProps> = (props) => {
	const { variables } = useScriptConstructor();

	const hasVariables = () => variables().length > 0;

	const param = () => props.param ?? { type: props.defaultParamType };

	const availableOptions = () => {
		return props.availableOptions.filter((option) => {
			if (option === ActionDynamicParamType.Variable) {
				return hasVariables();
			}

			return true;
		});
	};

	const changeHandler: ChangeHandler = (key) => (value) => {
		props.onChange({
			...param(),
			[key]: value,
		} as ActionDynamicParam);
	};

	const typeOptions = () =>
		availableOptions().map((option) => ({
			value: option,
			name: ParamTypeNames[option],
			icon: ParamTypeIcons[option],
		}));

	const initialType = () => param()?.type ?? undefined;

	return (
		<Row verticalAlignment={Row.Alignment.Vertical.Stretch}>
			<Show when={typeOptions().length > 1}>
				<div class={styles.selectorType}>
					<Select
						placeholder={"Selector type"}
						initialValue={initialType()}
						onChange={changeHandler("type")}
						options={typeOptions()}
					/>
				</div>
			</Show>
			<div class={styles.input}>
				<Switch fallback={<Input type="text" disabled />}>
					<Match when={param()?.type === ActionDynamicParamType.Variable} keyed>
						<InputVariable
							param={param() as ActionDynamicParamWithVariable}
							onChange={changeHandler}
						/>
					</Match>
					<Match when={param()?.type === ActionDynamicParamType.Selector} keyed>
						<InputSelector
							param={param() as ActionDynamicParamWithSelector}
							onChange={changeHandler}
						/>
					</Match>
					<Match when={param()?.type === ActionDynamicParamType.Text} keyed>
						<InputText
							param={param() as ActionDynamicParamWithText}
							onChange={changeHandler}
						/>
					</Match>
					<Match when={param()?.type === ActionDynamicParamType.Script} keyed>
						<InputScript
							param={param() as ActionDynamicParamWithScript}
							onChange={changeHandler}
						/>
					</Match>
				</Switch>
			</div>
		</Row>
	);
};

export { ParamsInputDynamic };
