import { ParentComponent } from "solid-js/types/render/component";

// eslint-disable-next-line @typescript-eslint/ban-types
interface ContextType<ContextProps = {}> {
	Provider: ParentComponent<ContextProps>;
}

export type { ContextType };
