import { storage, StorageKeys } from "common/storage";

import { ScriptData } from "./types";

const addScript = async (script: ScriptData): Promise<void> => {
	console.log("add", script);
	await storage.addItem(StorageKeys.Scripts, script);
};

export { addScript };
