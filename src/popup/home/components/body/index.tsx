import { MessageType, sendMessage } from "common/message-carrier";
import { Component, createResource, Show } from "solid-js";

import styles from "../../index.module.scss";
import { ButtonsRow } from "../buttons-row";
import { Navigation } from "../navigation";

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
				<Navigation />
			</div>
			<div class={styles.beta}>
				Beta{" "}
				<div class={styles.betaLink}>
					Welcome to contribute on{" "}
					<a target={"_blank"} href="https://github.com/bd-dm/chiller">
						Github
					</a>
				</div>
			</div>
		</Show>
	);
};

export { Body };
