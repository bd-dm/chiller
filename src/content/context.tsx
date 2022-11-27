import { MessageType, sendMessage } from "common/message-carrier";
import { getScripts, ScriptData } from "common/scripts";
import { ContextType } from "common/types";
import {
	Accessor,
	createContext,
	createEffect,
	createResource,
	createSignal,
	ParentComponent,
	Resource,
	Show,
	useContext,
} from "solid-js";

interface CoreContextValue {
	currentTab: Accessor<chrome.tabs.Tab>;
	scripts: Resource<ScriptData[]>;
}

const Context = createContext<CoreContextValue>();

const CoreContextProvider: ParentComponent = (props) => {
	const [currentTab, setCurrentTab] = createSignal<chrome.tabs.Tab>();
	const [scripts] = createResource(getScripts);

	createEffect(() => {
		(async () => {
			const tab = await sendMessage(MessageType.GetCurrentTab);
			setCurrentTab(tab);
		})();
	});

	return (
		<Show keyed when={currentTab()}>
			<Context.Provider
				value={{ currentTab: currentTab as Accessor<chrome.tabs.Tab>, scripts }}
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
