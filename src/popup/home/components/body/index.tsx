import { Component, createResource, Show } from "solid-js";
import styles from "../../index.module.scss";
import commonStyles from "../../../../common/styles/index.module.scss";
import { ButtonsRow } from "../buttons-row";
import { Scripts } from "../scripts";
import { sendMessage } from "../../../../common";
import { MessageType } from "../../../../common/message-carrier/enums";

const fetchBackgroundScreenshot = async () => {
	const imageUrl = await sendMessage(MessageType.GetTabScreenshot);
	console.log(imageUrl);

	return imageUrl;
};

const Body: Component = () => {
	const [imageUrl] = createResource(fetchBackgroundScreenshot);

	return (
		<Show when={imageUrl()} keyed>
			<div
				classList={{ [styles.background]: true }}
				style={{ "background-image": "url(" + imageUrl() + ")" }}
			>
				<div classList={{ [styles.popup]: true, [commonStyles.chiller]: true }}>
					<ButtonsRow />
					<Scripts />
				</div>
			</div>
		</Show>
	);
};

export { Body };
