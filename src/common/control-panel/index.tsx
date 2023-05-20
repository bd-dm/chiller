import { Component, createEffect, createSignal, Match, Switch } from "solid-js";

import { migrateScripts } from "../scripts";
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
	const [isReady, setIsReady] = createSignal(false);

	createEffect(() => {
		(async () => {
			await migrateScripts();
			setIsReady(true);
		})();
	});

	return (
		<Switch>
			<Match when={isReady()}>
				<ControlPanelContext.Provider>
					<Switch>
						<Match when={props.type === ControlPanelType.Popup}>
							<BodyPopup />
						</Match>
						<Match when={props.type === ControlPanelType.DevTools}>
							<BodyDevTools />
						</Match>
					</Switch>
				</ControlPanelContext.Provider>
			</Match>
		</Switch>
	);
};

export { ControlPanel, ControlPanelType };
