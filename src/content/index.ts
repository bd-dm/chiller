import { App } from "./App";
import { injectApp } from "./utils";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.injectChillerOverlay = () => {
	injectApp(App);
};
