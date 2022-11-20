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
import { getScripts, sendMessage } from "../../common";
import { Script } from "../../common/scripts/types";
import { MessageType } from "../../common/message-carrier/enums";

interface ContextValue {
	scripts: Resource<Script[]>;
	updateScripts: VoidFunction;
	isAddScriptOpened: Accessor<boolean>;
	setIsAddScriptOpened: Setter<boolean>;
}

const Context = createContext<ContextValue>();

const HomeContextProvider: ParentComponent = (props) => {
	const [isAddScriptOpened, setIsAddScriptOpened] = createSignal(false);
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
		isAddScriptOpened,
		setIsAddScriptOpened,
	};

	return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

const HomeContext = {
	Provider: HomeContextProvider,
};
const useHomeContext = () => useContext(Context)!;

export { HomeContext, useHomeContext };
