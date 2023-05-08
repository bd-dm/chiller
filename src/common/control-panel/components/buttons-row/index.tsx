import { IconName, Row } from "common/components";
import { MessageType, sendMessage } from "common/message-carrier";
import { Component } from "solid-js";

import { MenuButton } from "../../../components/menu-button";
import { useControlPanelContext } from "../../context";
import { Page } from "../../enums";
import styles from "./index.module.scss";

const ButtonsRow: Component = () => {
	const { page, setPage } = useControlPanelContext();

	const enableOverlay = async () => {
		await sendMessage(MessageType.InjectContent);
	};

	return (
		<Row
			classList={{ [styles.row]: true }}
			horizontalAlignment={Row.Alignment.Horizontal.Center}
		>
			<div class={styles.enableOverlayButton}>
				<MenuButton icon={IconName.Overlay} onClick={enableOverlay}>
					Overlay
				</MenuButton>
			</div>
			<MenuButton
				icon={IconName.List}
				active={page() === Page.ScriptList}
				onClick={() => setPage(Page.ScriptList)}
			>
				Scripts
			</MenuButton>
			<MenuButton
				icon={IconName.Add}
				active={page() === Page.AddScript}
				onClick={() => setPage(Page.AddScript)}
			>
				Add
			</MenuButton>
			<MenuButton
				icon={IconName.Upload}
				active={page() === Page.ImportScript}
				onClick={() => setPage(Page.ImportScript)}
			>
				Import
			</MenuButton>
		</Row>
	);
};

export { ButtonsRow };
