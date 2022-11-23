import { Component } from "solid-js";
import { addScript } from "../../../../common";
import { useHomeContext } from "../../context";
import { ScriptConstructor } from "../script-constructor";
import { Script } from "../../../../common/scripts/types";
import { Page } from "../../enums";

const AddScript: Component = () => {
	const { updateScripts, setPage } = useHomeContext();

	const addScriptHandler = async (script: Script) => {
		await addScript(script);
		setPage(Page.ScriptList);
		updateScripts();
	};

	return <ScriptConstructor onResult={addScriptHandler} />;
};

export { AddScript };
