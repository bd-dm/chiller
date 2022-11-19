import { render } from "solid-js/web";
import { isNull } from "lodash-es";
import { Component as SolidComponent } from "solid-js";

const createAppInElement = (Component: SolidComponent, id: string): void => {
	const root = document.getElementById(id);
	if (isNull(root)) {
		throw new Error("No root found on page");
	}

	render(() => <Component />, root);
};

export { createAppInElement };
