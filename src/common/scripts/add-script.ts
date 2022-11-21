import { Script } from "./types";
import { storage, StorageKeys } from "../storage";

const addScript = async (script: Script): Promise<void> => {
	await storage.addItem(StorageKeys.Scripts, script);
};

export { addScript };
