import { Component, createSignal } from "solid-js";
import styles from "./styles.module.scss";
import { isNull, isUndefined } from "lodash-es";
import { useCoreContext } from "../contexts";
import { sendMessage } from "../../common";
import { MessageType } from "../../common/message-carrier/enums";

const OverlayWindow: Component = () => {
	const [query, setQuery] = createSignal("");
	const { currentTab } = useCoreContext();

	const onClick = async () => {
		if (!query()) {
			console.log("No such element: ", query());
			return;
		}

		const element = document.querySelector(query());
		const tabId = currentTab().id;

		if (isNull(element) || isUndefined(tabId)) {
			return;
		}

		const debuggee = { tabId };

		await sendMessage(MessageType.SendDebuggerCommand, {
			target: debuggee,
			method: "Input.dispatchMouseEvent",
			commandParams: {
				type: "mousePressed",
				x: 20,
				y: 20,
			},
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
