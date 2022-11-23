import {
	createContext,
	createSignal,
	useContext,
	Show,
	onMount,
	Setter,
	Accessor,
} from "solid-js";
import { ParentComponent } from "solid-js/types/render/component";
import { Script } from "../../../../common/scripts/types";
import { ContextType } from "../../../../content/contexts/types";
import {
	ScriptBody,
	ScriptStep,
	ScriptVariables,
} from "../../../../common/types";
import { isUndefined } from "lodash-es";
import { getScript } from "../../../../common/scripts/get-script";
import { nanoid } from "nanoid";
import { ScriptConstructorProps } from "./types";

interface ScriptConstructorContextValue {
	id: Accessor<string>;
	name: Accessor<string>;
	variables: Accessor<ScriptVariables>;
	steps: Accessor<ScriptStep[]>;
	setName: Setter<string>;
	save?: () => void;
}

const Context = createContext<ScriptConstructorContextValue>();

const ScriptConstructorContextProvider: ParentComponent<
	ScriptConstructorProps
> = (props) => {
	const [id, setId] = createSignal("");
	const [name, setName] = createSignal("");
	const [variables, setVariables] = createSignal<ScriptVariables>({});
	const [steps, setSteps] = createSignal<ScriptStep[]>([]);

	onMount(async () => {
		const scriptId = props.scriptId;

		if (!isUndefined(scriptId)) {
			const initialScript = await getScript(scriptId);
			restoreScript(initialScript);
		} else {
			setId(nanoid());
		}
	});

	const restoreScript = (script: Script): void => {
		setId(script.id);
		setName(script.name);

		const { variables, steps } = JSON.parse(script.json) as ScriptBody;
		setVariables(variables);
		setSteps(steps);
	};

	const saveHandler = () => {
		if (!props.onResult) {
			return;
		}

		props.onResult({
			id: id(),
			name: name(),
			json: JSON.stringify({ variables: variables(), steps: steps() }),
			addedTimestamp: new Date().getTime(),
		});
	};

	return (
		<Show keyed when={id()}>
			<Context.Provider
				value={{ id, variables, steps, name, setName, save: saveHandler }}
			>
				{props.children}
			</Context.Provider>
		</Show>
	);
};

const ScriptConstructorContext: ContextType<ScriptConstructorProps> = {
	Provider: ScriptConstructorContextProvider,
};

const useScriptConstructor = (): ScriptConstructorContextValue =>
	useContext(Context)!;

export { ScriptConstructorContext, useScriptConstructor };
