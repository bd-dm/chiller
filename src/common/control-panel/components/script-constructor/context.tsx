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
import { nanoid } from "nanoid";
import { generateSlug } from "random-word-slugs";
import {
	Accessor,
	createContext,
	createEffect,
	createSignal,
	onCleanup,
	onMount,
	ParentComponent,
	Setter,
	Show,
	useContext,
} from "solid-js";
import { createStore } from "solid-js/store";

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
	getVariable: (name: string) => string | undefined;
	setVariable: (index: number, item: ConstructorVariableItem) => void;
	removeVariable: (index: number) => void;
	addVariable: () => void;
	steps: ConstructorStepItems;
	setSteps: (steps: ConstructorStepItems) => void;
	setStep: (id: string, item: ConstructorStepItem) => void;
	removeStep: (idToDelete: string) => void;
	addStep: () => void;
	setName: Setter<string>;
	cancel?: () => void;
	save?: () => void;
}
const getRandomName = () => generateSlug(2, { format: "title" });

const Context = createContext<ScriptConstructorContextValue>();

const ScriptConstructorContextProvider: ParentComponent<
	ScriptConstructorProps
> = (props) => {
	const [id, setId] = createSignal("");
	const [name, setName] = createSignal(getRandomName());
	const [steps, setSteps] = createStore<ConstructorStepItems>([]);
	const [variables, setVariables] = createSignal<ConstructorVariableItems>([]);

	const scriptData = () => ({
		id: id(),
		name: name(),
		body: JSON.stringify({
			version: SCRIPT_SCHEMA_VERSION,
			variables: variablesToObject(getFilledVariables(variables())),
			steps: getFilledSteps(steps),
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

	onCleanup(async () => {
		await reset(false);
	});

	createEffect(() => {
		if (
			getFilledVariables(variables()).length === variables().length &&
			variables().length > 0
		) {
			addVariable();
		}
	});

	createEffect(() => {
		if (getFilledSteps(steps).length === steps.length && steps.length > 0) {
			addStep();
		}
	});

	createEffect(() => {
		const shouldSave = variables().length > 0 || steps.length > 0;

		if (shouldSave) {
			saveDraft();
		} else {
			removeScriptDraft(id());
		}
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

	const reset = async (shouldRemoveDraft = true) => {
		setVariables([]);
		setSteps([]);
		setName("");

		if (shouldRemoveDraft) {
			// After updating the state, we need to wait for the next tick
			setTimeout(() => {
				removeScriptDraft(id());
			});
		}
	};

	const saveHandler = async () => {
		if (!props.onSave) {
			return;
		}

		props.onSave(scriptData());
		await reset();
	};

	const cancelHandler = async () => {
		await reset();

		if (props.onCancel) {
			props.onCancel();
		}
	};

	const getVariable = (name: string): string | undefined => {
		const variable = variables().find((item) => item.name === name);

		if (!variable) {
			return;
		}

		return variable.value;
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

	const setStep = (id: string, item: ConstructorStepItem): void => {
		setSteps((step) => step.id === id, item);
	};

	const removeStep = (idToDelete: string): void => {
		setSteps((prevSteps) => prevSteps.filter(({ id }) => idToDelete !== id));
	};

	const addStep = (): void => {
		setSteps((prevSteps) => [
			...prevSteps,
			{
				id: nanoid(),
			},
		]);
	};

	return (
		<Show when={id()}>
			<Context.Provider
				value={{
					id,
					variables,
					setVariable,
					removeVariable,
					getVariable,
					addVariable,
					steps,
					setStep,
					removeStep,
					addStep,
					setSteps,
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
