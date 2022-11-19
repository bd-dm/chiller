import { createContext } from "solid-js";
import { CoreContextType } from "./types";
import { ParentComponent } from "solid-js/types/render/component";

const Context = createContext();

const CoreContextProvider: ParentComponent = (props) => {
	return <Context.Provider value={null}>{props.children}</Context.Provider>;
};

const CoreContext: CoreContextType = {
	Provider: CoreContextProvider,
};

export { CoreContext };
