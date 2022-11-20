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
import { getScripts } from "../../common/scripts";
import { Script } from "../../common/scripts/types";

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

	const value = {
		scripts,
		updateScripts: refetch,
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
