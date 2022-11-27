import { Component } from "solid-js";

import { CoreContext } from "./context";
import { OverlayWindow } from "./overlay-window";

const App: Component = () => {
	return (
		<CoreContext.Provider>
			<OverlayWindow />
		</CoreContext.Provider>
	);
};

export { App };
