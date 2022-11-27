import { Button, Column, Row } from "common/components";
import { MessageType, sendMessage } from "common/message-carrier";
import { Component } from "solid-js";

import { useHomeContext } from "../../context";
import { Page } from "../../enums";
import styles from "./index.module.scss";

const ButtonsRow: Component = () => {
	const { page, setPage } = useHomeContext();

	const openChiller = async () => {
		await sendMessage(MessageType.InjectContent);
	};

	return (
		<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
			<Button
				classList={{ [styles.button]: true }}
				type={"button"}
				onClick={openChiller}
			>
				Toggle overlay
			</Button>
			<Row verticalAlignment={Row.Alignment.Vertical.Stretch}>
				<Button
					classList={{
						[styles.button]: true,
					}}
					active={page() === Page.ScriptList}
					type={"button"}
					onClick={() => setPage(Page.ScriptList)}
				>
					Scripts
				</Button>
				<Button
					classList={{
						[styles.button]: true,
					}}
					active={page() === Page.AddScript}
					type={"button"}
					onClick={() => setPage(Page.AddScript)}
				>
					Add script
				</Button>
			</Row>
		</Column>
	);
};

export { ButtonsRow };
