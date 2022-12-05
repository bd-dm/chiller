import { Component, Match, Switch } from "solid-js";

import { BodyDevTools, BodyPopup } from "./components";
import { ControlPanelContext } from "./context";

enum ControlPanelType {
	Popup,
	DevTools,
}

interface ControlPanelProps {
	type: ControlPanelType;
}

const ControlPanel: Component<ControlPanelProps> = (props) => {
	return (
		<ControlPanelContext.Provider>
			<Switch>
				<Match when={props.type === ControlPanelType.Popup} keyed>
					<BodyPopup />
				</Match>
				<Match when={props.type === ControlPanelType.DevTools} keyed>
					<BodyDevTools />
				</Match>
			</Switch>
		</ControlPanelContext.Provider>
	);
};

export { ControlPanel, ControlPanelType };
