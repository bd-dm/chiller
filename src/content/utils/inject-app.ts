import { createAppInElement } from "../../common";
import { DEFAULT_ROOT_ID } from "../constants";
import { Component as SolidComponent } from "solid-js";

const injectApp = (Component: SolidComponent): void => {
	let rootId = DEFAULT_ROOT_ID;
	if (document.getElementById(rootId)) {
		rootId += Math.random();
	}

	const rootElement = document.createElement("div");
	rootElement.id = rootId;

	createAppInElement(Component, rootId);
};

export { injectApp };
