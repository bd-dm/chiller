import { Component, createSignal } from "solid-js";
import styles from "./index.module.scss";
import { isUndefined } from "lodash-es";
import { useCoreContext } from "../contexts";
import { userEvents } from "../user-events";

const OverlayWindow: Component = () => {
	const [selector, setSelector] = createSignal("body");
	const { currentTab } = useCoreContext();

	const onClick = async () => {
		if (!selector()) {
			console.error("No such element: ", selector());
			return;
		}

		const tabId = currentTab().id;

		if (isUndefined(tabId)) {
			return;
		}

		userEvents.start(tabId);
		await userEvents.click({ selector: selector() });
		await userEvents.type({ text: "Пук пук пук)))" });
	};

	return (
		<div class={styles.overlay}>
			<div>Overlay Window</div>
			<div>
				<input
					type="text"
					onInput={({ currentTarget: { value } }) => setSelector(value)}
				/>
				<button type={"button"} onClick={onClick}>
					Click
				</button>
			</div>
		</div>
	);
};

export { OverlayWindow };
