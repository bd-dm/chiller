import { ActionOption } from "./types";

const actionOptions: ActionOption[] = [
	{ value: "click", name: "Click" },
	{ value: "pressKey", name: "Press Key" },
	{ value: "type", name: "Type string" },
	{ value: "enterChar", name: "Enter char" },
	{ value: "waitForElement", name: "Wait for element" },
	{ value: "clearInput", name: "Clear input" },
	{ value: "sleep", name: "Sleep" },
];

export { actionOptions };
