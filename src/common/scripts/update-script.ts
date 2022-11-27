import { ScriptData } from "./types";
import { StorageKeys } from "../storage";
import { storage } from "../storage";

const updateScript = async (script: ScriptData): Promise<void> => {
	await storage.updateItem(
		StorageKeys.Scripts,
		({ id }) => id === script.id,
		script
	);
};

export { updateScript };
