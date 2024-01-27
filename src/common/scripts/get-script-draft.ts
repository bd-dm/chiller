import { storage, StorageKeys } from "common/storage";

import { ScriptData } from "./types";

const getScriptDraft = async (
	scriptId: ScriptData["id"],
): Promise<ScriptData | null> => {
	return await storage.getItem(
		StorageKeys.ScriptDrafts,
		({ id }) => id === scriptId,
	);
};

export { getScriptDraft };
