import {
	getScriptOrDraft,
	removeScriptDraft,
	saveScriptDraft,
	SCRIPT_SCHEMA_VERSION,
	ScriptBody,
	ScriptData,
} from "common/scripts";
import { ContextType } from "common/types";
import { isNull } from "lodash-es";
import {
	Accessor,
	createContext,
	createEffect,
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
import {
	getFilledSteps,
	getFilledVariables,
	variablesToArray,
	variablesToObject,
} from "./utils";

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
	moveStepUp: (index: number) => void;
	moveStepDown: (index: number) => void;
	setName: Setter<string>;
	cancel?: () => void;
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

	const scriptData = () => ({
		id: id(),
		name: name(),
		body: JSON.stringify({
			version: SCRIPT_SCHEMA_VERSION,
			variables: variablesToObject(getFilledVariables(variables())),
			steps: getFilledSteps(steps()),
		} as ScriptBody),
		addedTimestamp: new Date().getTime(),
	});

	onMount(async () => {
		const scriptId = props.scriptId;
		const initialScript = await getScriptOrDraft(scriptId);

		if (!isNull(initialScript)) {
			restoreScript(initialScript);
		} else {
			setId(scriptId);
		}
	});

	createEffect(() => {
		if (getFilledVariables(variables()).length === variables().length) {
			addVariable();
		}
	});

	createEffect(() => {
		if (getFilledSteps(steps()).length === steps().length) {
			addStep();
		}
	});

	createEffect(() => {
		saveDraft();
	});

	const restoreScript = (script: ScriptData): void => {
		setId(script.id);
		setName(script.name);

		const { variables, steps } = JSON.parse(script.body) as ScriptBody;

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

	const saveDraft = async () => {
		await saveScriptDraft(scriptData());
	};

	const removeDraft = async () => {
		await removeScriptDraft(id());
	};

	const saveHandler = async () => {
		if (!props.onSave) {
			return;
		}

		await removeDraft();
		props.onSave(scriptData());
	};

	const cancelHandler = async () => {
		await removeDraft();

		if (props.onCancel) {
			props.onCancel();
		}
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

	const moveStepUp = (index: number): void => {
		setSteps((prevSteps) => {
			const upperStep = prevSteps[index - 1];
			prevSteps[index - 1] = prevSteps[index];
			prevSteps[index] = upperStep;
			return [...prevSteps];
		});
	};

	const moveStepDown = (index: number): void => {
		setSteps((prevSteps) => {
			const bottomStep = prevSteps[index + 1];
			prevSteps[index + 1] = prevSteps[index];
			prevSteps[index] = bottomStep;
			return [...prevSteps];
		});
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
					moveStepUp,
					moveStepDown,
					name,
					setName,
					cancel: cancelHandler,
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
