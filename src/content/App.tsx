import { Component } from "solid-js";
import { OverlayWindow } from "./overlay-window";
import { CoreContext } from "./context";

const App: Component = () => {
	return (
		<CoreContext.Provider>
			<OverlayWindow />
		</CoreContext.Provider>
	);
};

export { App };
