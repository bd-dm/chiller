import { MessageType, sendMessage } from "common/message-carrier";
import { Component, createResource, Show } from "solid-js";

import styles from "../../index.module.scss";
import { ButtonsRow } from "../buttons-row";
import { Scripts } from "../scripts";

const fetchBackgroundScreenshot = async () => {
	return sendMessage(MessageType.GetTabScreenshot);
};

const Body: Component = () => {
	const [imageUrl] = createResource(fetchBackgroundScreenshot);

	return (
		<Show when={imageUrl()} keyed>
			<div
				classList={{ [styles.background]: true }}
				style={{ "background-image": "url(" + imageUrl() + ")" }}
			/>
			<div classList={{ [styles.backdrop]: true }} />
			<div classList={{ [styles.popup]: true, ["chiller"]: true }}>
				<ButtonsRow />
				<Scripts />
			</div>
		</Show>
	);
};

export { Body };
