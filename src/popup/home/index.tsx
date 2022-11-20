import { Component } from "solid-js";
import { sendMessage } from "../../common";
import { MessageType } from "../../common/message-carrier/enums";

const Home: Component = () => {
	const openChiller = async () => {
		await sendMessage(MessageType.InjectContent);
	};

	return (
		<div>
			<div>
				<h3>Scripts</h3>
				<ul>
					<li>script1</li>
					<li>script2</li>
				</ul>
			</div>
			<button type={"button"} onClick={openChiller}>
				Open Chiller
			</button>
		</div>
	);
};

export { Home };
