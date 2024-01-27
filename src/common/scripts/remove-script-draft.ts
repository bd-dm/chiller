import { storage, StorageKeys } from "common/storage";

import { ScriptData } from "./types";

const removeScriptDraft = async (scriptId: ScriptData["id"]): Promise<void> => {
	await storage.removeItem(
		StorageKeys.ScriptDrafts,
		({ id }) => id === scriptId,
	);
};

export { removeScriptDraft };
