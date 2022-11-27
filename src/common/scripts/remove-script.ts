import { ScriptData } from "./types";
import { storage, StorageKeys } from "../storage";

const removeScript = async (scriptId: ScriptData["id"]): Promise<void> => {
	await storage.removeItem(StorageKeys.Scripts, ({ id }) => id === scriptId);
};

export { removeScript };
