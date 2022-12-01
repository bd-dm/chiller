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
				classList={{ [styles.flex]: true }}
				type={"button"}
				onClick={openChiller}
			>
				Toggle overlay
			</Button>
			<Row verticalAlignment={Row.Alignment.Vertical.Stretch}>
				<Button
					classList={{
						[styles.flex]: true,
					}}
					active={page() === Page.ScriptList}
					type={"button"}
					onClick={() => setPage(Page.ScriptList)}
				>
					Scripts
				</Button>
				<Row
					classList={{
						[styles.flex]: true,
					}}
					verticalAlignment={Row.Alignment.Vertical.Stretch}
				>
					<Button
						active={page() === Page.ImportScript}
						type={"button"}
						classList={{
							[styles.flex]: true,
						}}
						onClick={() => setPage(Page.ImportScript)}
					>
						Import
					</Button>
					<Button
						active={page() === Page.AddScript}
						type={"button"}
						classList={{
							[styles.flex]: true,
						}}
						onClick={() => setPage(Page.AddScript)}
					>
						Create new
					</Button>
				</Row>
			</Row>
		</Column>
	);
};

export { ButtonsRow };
