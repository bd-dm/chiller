import {
	Accessor,
	createContext,
	createResource,
	createSignal,
	Resource,
	Setter,
	useContext,
} from "solid-js";
import { ParentComponent } from "solid-js/types/render/component";
import { getScripts, sendMessage, ScriptData, MessageType } from "../../common";
import { Page } from "./enums";

interface ContextValue {
	page: Accessor<Page>;
	setPage: Setter<Page>;
	scripts: Resource<ScriptData[]>;
	updateScripts: VoidFunction;
}

const Context = createContext<ContextValue>();

const HomeContextProvider: ParentComponent = (props) => {
	const [page, setPage] = createSignal(Page.AddScript);
	const [scripts, { refetch }] = createResource(getScripts);

	const reloadOverlay = async () => {
		await sendMessage(MessageType.InjectContent);
		await sendMessage(MessageType.InjectContent);
	};

	const updateScripts = async () => {
		refetch();
		await reloadOverlay();
	};

	const value = {
		scripts,
		updateScripts,
		page,
		setPage,
	};

	return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

const HomeContext = {
	Provider: HomeContextProvider,
};
const useHomeContext = () => useContext(Context)!;

export { HomeContext, useHomeContext };
