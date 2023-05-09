/// <reference types="@types/chrome" />

import "solid-js";

declare global {
	interface Window {
		injectChillerOverlay: () => void;
	}
}

declare module "solid-js" {
	namespace JSX {
		interface Directives {
			draggable: boolean;
			droppable: boolean;
			sortable: boolean;
		}
	}
}
