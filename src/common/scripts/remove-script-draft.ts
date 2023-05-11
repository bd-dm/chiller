import { storage, StorageKeys } from "common/storage";

import { ScriptData } from "./types";

const removeScriptDraft = async (scriptId: ScriptData["id"]): Promise<void> => {
	console.log("removeItem", scriptId);

	await storage.removeItem(
		StorageKeys.ScriptDrafts,
		({ id }) => id === scriptId
	);
};

export { removeScriptDraft };
