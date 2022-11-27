import { getScript, ScriptBody, ScriptData } from "common/scripts";
import { ContextType } from "common/types";
import { isUndefined } from "lodash-es";
import { nanoid } from "nanoid";
import {
	Accessor,
	createContext,
	createSignal,
	onMount,
	ParentComponent,
	Setter,
	Show,
	useContext,
} from "solid-js";

import {
	ConstructorStepItem,
	ConstructorStepItems,
	ConstructorVariableItem,
	ConstructorVariableItems,
	ScriptConstructorProps,
} from "./types";
import { variablesToArray, variablesToObject } from "./utils";

interface ScriptConstructorContextValue {
	id: Accessor<string>;
	name: Accessor<string>;
	variables: Accessor<ConstructorVariableItems>;
	setVariable: (index: number, item: ConstructorVariableItem) => void;
	removeVariable: (index: number) => void;
	addVariable: () => void;
	steps: Accessor<ConstructorStepItems>;
	setStep: (index: number, item: ConstructorStepItem) => void;
	removeStep: (index: number) => void;
	addStep: () => void;
	setName: Setter<string>;
	save?: () => void;
}

const Context = createContext<ScriptConstructorContextValue>();

const ScriptConstructorContextProvider: ParentComponent<
	ScriptConstructorProps
> = (props) => {
	const [id, setId] = createSignal("");
	const [name, setName] = createSignal("");
	const [variables, setVariables] = createSignal<ConstructorVariableItems>([]);
	const [steps, setSteps] = createSignal<ConstructorStepItems>([]);

	onMount(async () => {
		const scriptId = props.scriptId;

		if (!isUndefined(scriptId)) {
			const initialScript = await getScript(scriptId);
			restoreScript(initialScript);
		} else {
			setId(nanoid());
			addVariable();
			addStep();
		}
	});

	const restoreScript = (script: ScriptData): void => {
		setId(script.id);
		setName(script.name);

		const { variables, steps } = JSON.parse(script.json) as ScriptBody;

		if (variables) {
			setVariables(variablesToArray(variables));
		} else {
			addVariable();
		}

		if (steps) {
			setSteps(steps);
		} else {
			addStep();
		}
	};

	const saveHandler = () => {
		if (!props.onResult) {
			return;
		}

		props.onResult({
			id: id(),
			name: name(),
			json: JSON.stringify({
				variables: variablesToObject(variables()),
				steps: steps(),
			}),
			addedTimestamp: new Date().getTime(),
		});
	};

	const setVariable = (index: number, item: ConstructorVariableItem): void => {
		setVariables((prevVariables) => {
			prevVariables[index] = item;
			return [...prevVariables];
		});
	};

	const removeVariable = (index: number): void => {
		setVariables((prevVariables) =>
			prevVariables.filter((_, prevIndex) => prevIndex !== index)
		);
	};

	const addVariable = (): void => {
		setVariables((prevVariables) => [
			...prevVariables,
			{ name: "", value: "" },
		]);
	};

	const setStep = (index: number, item: ConstructorStepItem): void => {
		setSteps((prevSteps) => {
			prevSteps[index] = item;
			return [...prevSteps];
		});
	};

	const removeStep = (index: number): void => {
		setSteps((prevSteps) =>
			prevSteps.filter((_, prevIndex) => prevIndex !== index)
		);
	};

	const addStep = (): void => {
		setSteps((prevSteps) => [...prevSteps, {}]);
	};

	return (
		<Show keyed when={id()}>
			<Context.Provider
				value={{
					id,
					variables,
					setVariable,
					removeVariable,
					addVariable,
					steps,
					setStep,
					removeStep,
					addStep,
					name,
					setName,
					save: saveHandler,
				}}
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
