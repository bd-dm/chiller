import {
	createContext,
	createEffect,
	createSignal,
	Accessor,
	useContext,
	Show,
	createResource,
	Resource,
} from "solid-js";
import { ParentComponent } from "solid-js/types/render/component";
import {
	sendMessage,
	getScripts,
	ScriptData,
	ContextType,
	MessageType,
} from "../common";

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
