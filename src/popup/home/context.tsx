import { MessageType, sendMessage } from "common/message-carrier";
import { getScripts, ScriptData } from "common/scripts";
import {
	Accessor,
	createContext,
	createEffect,
	createResource,
	createSignal,
	onMount,
	ParentComponent,
	Resource,
	Setter,
	useContext,
} from "solid-js";

import { Page } from "./enums";
import { getPage, savePage } from "./utils";

interface ContextValue {
	page: Accessor<Page>;
	setPage: Setter<Page>;
	scripts: Resource<ScriptData[]>;
	updateScripts: VoidFunction;
}

const Context = createContext<ContextValue>();

const HomeContextProvider: ParentComponent = (props) => {
	const [page, setPage] = createSignal(Page.ScriptList);
	const [scripts, { refetch }] = createResource(getScripts);

	onMount(async () => {
		setPage(await getPage());
	});

	createEffect(() => {
		savePage(page());
	});

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