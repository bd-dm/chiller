import { ScriptData } from "./types";
import { storage, StorageKeys } from "../storage";

const addScript = async (script: ScriptData): Promise<void> => {
	await storage.addItem(StorageKeys.Scripts, script);
};

export { addScript };
