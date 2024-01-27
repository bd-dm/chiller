import { storage, StorageKeys } from "../storage";
import { getScriptDraft } from "./get-script-draft";
import { getScripts } from "./get-scripts";
import { ScriptData } from "./types";

const getScriptOrDraft = async (
	scriptId: ScriptData["id"],
): Promise<ScriptData | null> => {
	const scriptDraft = await getScriptDraft(scriptId);

	if (scriptDraft) {
		return scriptDraft;
	}

	const scripts = await getScripts();
	const scriptIds = scripts.map(({ id }) => id);
	const script = scripts.find(({ id }: ScriptData) => id === scriptId);

	if (script) {
		return script;
	}

	const scriptDrafts = await storage.get(StorageKeys.ScriptDrafts);
	const lastUnsavedDraft = scriptDrafts?.find(
		({ id }) => !scriptIds.includes(id),
	);

	if (lastUnsavedDraft) {
		return lastUnsavedDraft;
	}

	return null;
};

export { getScriptOrDraft };
