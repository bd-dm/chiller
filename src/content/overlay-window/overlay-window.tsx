import { Component, createSignal } from "solid-js";
import styles from "./styles.module.scss";
import { isNull, isUndefined } from "lodash-es";

const OverlayWindow: Component = () => {
	const [query, setQuery] = createSignal("");

	const onClick = async () => {
		const { id: tabId } = (await chrome.tabs.getCurrent()) ?? {};
		const element = document.querySelector(query());

		if (isNull(element) || isUndefined(tabId)) {
			return;
		}

		const debuggee = { tabId: tabId };
		console.log("clicking", debuggee);

		chrome.debugger.attach(debuggee, "1.2", function () {
			chrome.debugger.sendCommand(debuggee, "Input.dispatchMouseEvent", {
				type: "mousePressed",
				x: 20,
				y: 20,
			});
		});
	};

	return (
		<div class={styles.overlay}>
			<div>Overlay Window</div>
			<div>
				<input
					type="text"
					onInput={({ currentTarget: { value } }) => setQuery(value)}
				/>
				<button type={"button"} onClick={onClick}>
					Click
				</button>
			</div>
		</div>
	);
};

export { OverlayWindow };
