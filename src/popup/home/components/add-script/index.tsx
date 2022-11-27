import { addScript, ScriptData } from "common/scripts";
import { nanoid } from "nanoid";
import { Component } from "solid-js";

import { useHomeContext } from "../../context";
import { Page } from "../../enums";
import { ScriptConstructor } from "../script-constructor";

const AddScript: Component = () => {
	const { updateScripts, setPage } = useHomeContext();

	const addScriptHandler = async (script: ScriptData) => {
		await addScript(script);
		setPage(Page.ScriptList);
		updateScripts();
	};

	return <ScriptConstructor onSave={addScriptHandler} scriptId={nanoid()} />;
};

export { AddScript };
