import { Component } from "solid-js";
import { sendMessage } from "../../common";
import { MessageType } from "../../common/message-carrier/enums";
import { Scripts } from "./components";
import { HomeContext } from "./context";
import styles from "./index.module.scss";
import commonStyles from "../../common/styles/index.module.scss";

const Home: Component = () => {
	const openChiller = async () => {
		await sendMessage(MessageType.InjectContent);
	};

	return (
		<HomeContext.Provider>
			<div classList={{ [styles.popup]: true, [commonStyles.chiller]: true }}>
				<button type={"button"} onClick={openChiller}>
					Toggle scripts window
				</button>
				<Scripts />
			</div>
		</HomeContext.Provider>
	);
};

export { Home };
