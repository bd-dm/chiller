import {
	createContext,
	createEffect,
	createSignal,
	useContext,
} from "solid-js";
import { ParentComponent } from "solid-js/types/render/component";
import { sendMessage } from "../../../common";
import { MessageType } from "../../../common/message-carrier/enums";
import { ContextType } from "../types";

const Context = createContext();

const CoreContextProvider: ParentComponent = (props) => {
	const [currentTab, setCurrentTab] = createSignal<chrome.tabs.Tab>();
	createEffect(() => {
		(async () => {
			const tab = await sendMessage(MessageType.GetCurrentTab);
			setCurrentTab(tab);
		})();
	});

	return (
		<Context.Provider value={{ currentTab }}>{props.children}</Context.Provider>
	);
};

const CoreContext: ContextType = {
	Provider: CoreContextProvider,
};

const useCoreContext = () => useContext(Context);

export { CoreContext, useCoreContext };
