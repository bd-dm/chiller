import { Component as SolidComponent } from "solid-js";

import { createAppInElement } from "@/common";

import { DEFAULT_ROOT_ID } from "../constants";

const injectApp = (Component: SolidComponent): void => {
	let rootId = DEFAULT_ROOT_ID;
	if (document.getElementById(rootId)) {
		rootId += Math.random();
	}

	const rootElement = document.createElement("div");
	rootElement.id = rootId;
	rootElement.dataset.chillerOverlay = "true";
	document.body.append(rootElement);

	createAppInElement(Component, rootId);
};

export { injectApp };
