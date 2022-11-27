import { createAppInElement } from "common/utils";
import { isNull } from "lodash-es";
import { Component as SolidComponent } from "solid-js";

import { DEFAULT_ROOT_ID } from "../constants";

const injectApp = (Component: SolidComponent): void => {
	const prevAppsOnPage = document.querySelector("[data-chiller-overlay=true]");
	if (!isNull(prevAppsOnPage)) {
		return;
	}

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
