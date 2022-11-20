import {
	createContext,
	createEffect,
	createSignal,
	Accessor,
	useContext,
	Show,
} from "solid-js";
import { ParentComponent } from "solid-js/types/render/component";
import { sendMessage } from "../../../common";
import { MessageType } from "../../../common/message-carrier/enums";
import { ContextType } from "../types";

interface CoreContextValue {
	currentTab: Accessor<chrome.tabs.Tab>;
}

const Context = createContext<CoreContextValue>();

const CoreContextProvider: ParentComponent = (props) => {
	const [currentTab, setCurrentTab] = createSignal<chrome.tabs.Tab>();
	createEffect(() => {
		(async () => {
			const tab = await sendMessage(MessageType.GetCurrentTab);
			await sendMessage(MessageType.AttachDebugger, {
				target: { tabId: tab.id },
			});
			setCurrentTab(tab);
		})();
	});

	return (
		<Show keyed when={currentTab()}>
			<Context.Provider
				value={{ currentTab: currentTab as Accessor<chrome.tabs.Tab> }}
			>
				{props.children}
			</Context.Provider>
		</Show>
	);
};

const CoreContext: ContextType = {
	Provider: CoreContextProvider,
};

const useCoreContext = (): CoreContextValue => useContext(Context)!;

export { CoreContext, useCoreContext };
