import { createContext, createResource, Resource, useContext } from "solid-js";
import { ParentComponent } from "solid-js/types/render/component";
import { getScripts } from "../../common/scripts";
import { Script } from "../../common/scripts/types";

interface ContextValue {
	scripts: Resource<Script[]>;
	updateScripts: VoidFunction;
}

const Context = createContext<ContextValue>();

const HomeContextProvider: ParentComponent = (props) => {
	const [scripts, { refetch }] = createResource(getScripts);
	console.log(123, scripts());

	const value = {
		scripts,
		updateScripts: refetch,
	};

	return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

const HomeContext = {
	Provider: HomeContextProvider,
};
const useHomeContext = () => useContext(Context)!;

export { HomeContext, useHomeContext };
