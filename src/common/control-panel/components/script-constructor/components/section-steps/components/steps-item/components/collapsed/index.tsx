import { Button, InlineIcon, Row } from "common/components";
import { ScriptStep } from "common/scripts";
import {
	ActionDynamicParamType,
	ActionDynamicParamWithScript,
	ActionDynamicParamWithSelector,
	ActionDynamicParamWithText,
	ActionDynamicParamWithVariable,
	UserEventAction,
	UserEventParams,
} from "common/user-events";
import { Keys } from "common/user-events/events";
import { isUndefined } from "lodash-es";
import { Component, Match, Show, Switch } from "solid-js";

import { actionIcons, actionNames } from "../../../../../../action-variants";
import { useScriptConstructor } from "../../../../../../context";
import styles from "./index.module.scss";

interface CollapsedProps {
	action: ScriptStep["action"];
	params: ScriptStep["params"];
	onExpand: () => void;
}

const TargetedParamsInfo: Component<CollapsedProps> = (props) => {
	const params = <
		Type extends
			| "click"
			| "clearInput"
			| "waitForElement"
			| "enterText"
			| "runScript",
	>() => props.params as UserEventParams<Type>;
	const { getVariable } = useScriptConstructor();

	return (
		<Switch>
			<Match when={params().target.type === ActionDynamicParamType.Text}>
				"{(params().target as ActionDynamicParamWithText).text}"
			</Match>
			<Match when={params().target.type === ActionDynamicParamType.Script}>
				"{(params().target as ActionDynamicParamWithScript).script}"
			</Match>
			<Match when={params().target.type === ActionDynamicParamType.Selector}>
				CSS selector "
				{(params().target as ActionDynamicParamWithSelector).selector}"
			</Match>
			<Match when={params().target.type === ActionDynamicParamType.Variable}>
				"{getVariable((params().target as ActionDynamicParamWithVariable).use)}
				"&nbsp;
				<span class={styles.redundant}>
					(variable "{(params().target as ActionDynamicParamWithVariable).use}
					")
				</span>
			</Match>
		</Switch>
	);
};

const ParamsInfo: Component<CollapsedProps> = (props) => {
	const params = <Type extends UserEventAction>() =>
		props.params as UserEventParams<Type>;

	return (
		<Switch>
			<Match when={props.action === "click"}>
				<TargetedParamsInfo {...props} />
			</Match>
			<Match when={props.action === "clearInput"}>
				<TargetedParamsInfo {...props} />
			</Match>
			<Match when={props.action === "waitForElement"}>
				<TargetedParamsInfo {...props} />
			</Match>
			<Match when={props.action === "enterText"}>
				<TargetedParamsInfo {...props} />
			</Match>
			<Match when={props.action === "runScript"}>
				<TargetedParamsInfo {...props} />
			</Match>
			<Match when={props.action === "pressKey"}>
				"{Keys[params<"pressKey">().key]}"
			</Match>
			<Match when={props.action === "enterChar"}>
				"{params<"enterChar">().char}"
			</Match>
			<Match when={props.action === "typeRandom"}>
				[{params<"typeRandom">().variants.join(", ")}]
			</Match>
			<Match when={props.action === "sleep"}>{params<"sleep">().ms} ms</Match>
		</Switch>
	);
};

const Collapsed: Component<CollapsedProps> = (props) => {
	return (
		<Button
			classList={{ [styles.button]: true }}
			light
			onClick={() => props.onExpand()}
		>
			<Row
				horizontalAlignment={Row.Alignment.Horizontal.FlexStart}
				verticalAlignment={Row.Alignment.Vertical.Center}
			>
				<InlineIcon name={actionIcons[props.action]} />
				<div>
					{actionNames[props.action]}&nbsp;
					<Show when={!isUndefined(props.params)}>
						<ParamsInfo {...props} />
					</Show>
				</div>
			</Row>
		</Button>
	);
};

export { Collapsed };
