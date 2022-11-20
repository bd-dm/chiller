import { Component } from "solid-js";
import { Row } from "../../../../common/components";
import { sendMessage } from "../../../../common";
import { MessageType } from "../../../../common/message-carrier/enums";
import { useHomeContext } from "../../context";
import styles from "./index.module.scss";
import commonStyles from "../../../../common/styles/index.module.scss";

const ButtonsRow: Component = () => {
	const { isAddScriptOpened, setIsAddScriptOpened } = useHomeContext();

	const toggleAddScript = () => setIsAddScriptOpened(!isAddScriptOpened());

	const openChiller = async () => {
		await sendMessage(MessageType.InjectContent);
	};

	return (
		<Row verticalAlignment={Row.Alignment.Vertical.Stretch}>
			<button class={styles.button} type={"button"} onClick={openChiller}>
				Toggle overlay
			</button>
			<button
				classList={{
					[styles.button]: true,
					[commonStyles.active]: isAddScriptOpened(),
				}}
				type={"button"}
				onClick={toggleAddScript}
			>
				New script
			</button>
		</Row>
	);
};

export { ButtonsRow };
