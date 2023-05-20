import { Component } from "solid-js";

import { IconName, Row } from "../../../components";
import { MenuButton } from "../../../components/menu-button";
import { MessageType, sendMessage } from "../../../message-carrier";
import styles from "./index.module.scss";

const OverlayButton: Component = () => {
	const enableOverlay = async () => {
		await sendMessage(MessageType.InjectContent);
	};

	return (
		<Row
			horizontalAlignment={Row.Alignment.Horizontal.Stretch}
			verticalAlignment={Row.Alignment.Vertical.Stretch}
			classList={{
				[styles.button]: true,
			}}
		>
			<MenuButton icon={IconName.Overlay} onClick={enableOverlay}>
				Overlay
			</MenuButton>
		</Row>
	);
};

export { OverlayButton };
