import { Component, Show } from "solid-js";
import { addScript } from "../../../../common";
import { useHomeContext } from "../../context";
import { ScriptInput } from "../script-input";
import { Script } from "../../../../common/scripts/types";

const AddScript: Component = () => {
	const { updateScripts, isAddScriptOpened, setIsAddScriptOpened } =
		useHomeContext();

	const addScriptHandler = async (script: Script) => {
		await addScript(script);
		setIsAddScriptOpened(false);
		updateScripts();
	};

	return (
		<Show keyed when={isAddScriptOpened()}>
			<ScriptInput onResult={addScriptHandler} />
		</Show>
	);
};

export { AddScript };
