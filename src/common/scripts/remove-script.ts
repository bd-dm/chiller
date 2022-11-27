import { storage, StorageKeys } from "common/storage";

import { ScriptData } from "./types";

const removeScript = async (scriptId: ScriptData["id"]): Promise<void> => {
	await storage.removeItem(StorageKeys.Scripts, ({ id }) => id === scriptId);
};

export { removeScript };
