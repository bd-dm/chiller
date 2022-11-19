import { createAppInElement } from "../../common";
import { DEFAULT_ROOT_ID } from "../constants";
import { Component as SolidComponent } from "solid-js";

const injectApp = (Component: SolidComponent): void => {
	console.log("INJECTING");
	let rootId = DEFAULT_ROOT_ID;
	if (document.getElementById(rootId)) {
		rootId += Math.random();
	}

	const rootElement = document.createElement("div");
	rootElement.id = rootId;
	document.body.append(rootElement);

	createAppInElement(Component, rootId);
};

export { injectApp };
