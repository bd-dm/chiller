import { Component } from "solid-js";
import { OverlayWindow } from "./overlay-window";
import { CoreContext } from "./contexts";

const App: Component = () => {
	return (
		<CoreContext.Provider>
			<OverlayWindow />
		</CoreContext.Provider>
	);
};

export { App };
