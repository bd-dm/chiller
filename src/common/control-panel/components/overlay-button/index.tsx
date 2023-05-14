import { Component } from "solid-js";

import { IconName } from "../../../components";
import { MenuButton } from "../../../components/menu-button";
import { MessageType, sendMessage } from "../../../message-carrier";

const OverlayButton: Component = () => {
	const enableOverlay = async () => {
		await sendMessage(MessageType.InjectContent);
	};

	return (
		<MenuButton icon={IconName.Overlay} onClick={enableOverlay}>
			Overlay
		</MenuButton>
	);
};

export { OverlayButton };
