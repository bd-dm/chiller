import { Component } from "solid-js";
import { Column, Row } from "../../../../common/components";
import { sendMessage } from "../../../../common";
import { MessageType } from "../../../../common/message-carrier/enums";
import { useHomeContext } from "../../context";
import styles from "./index.module.scss";
import commonStyles from "../../../../common/styles/index.module.scss";
import { Page } from "../../enums";

const ButtonsRow: Component = () => {
	const { page, setPage } = useHomeContext();

	const openChiller = async () => {
		await sendMessage(MessageType.InjectContent);
	};

	return (
		<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
			<button class={styles.button} type={"button"} onClick={openChiller}>
				Toggle overlay
			</button>
			<Row verticalAlignment={Row.Alignment.Vertical.Stretch}>
				<button
					classList={{
						[styles.button]: true,
						[commonStyles.active]: page() === Page.ScriptList,
					}}
					type={"button"}
					onClick={() => setPage(Page.ScriptList)}
				>
					Scripts
				</button>
				<button
					classList={{
						[styles.button]: true,
						[commonStyles.active]: page() === Page.AddScript,
					}}
					type={"button"}
					onClick={() => setPage(Page.AddScript)}
				>
					Add script
				</button>
			</Row>
		</Column>
	);
};

export { ButtonsRow };
