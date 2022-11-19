import { render } from "solid-js/web";
import { App } from "./src";
import { isNull } from "lodash-es";

const root = document.getElementById("root");

if (!isNull(root)) {
	render(() => <App />, root);
} else {
	throw new Error("No root found on page");
}
