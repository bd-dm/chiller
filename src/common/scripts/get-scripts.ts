import { ScriptData } from "./types";
import { storage, StorageKeys } from "../storage";

const getScripts = async (): Promise<ScriptData[]> => {
	return (await storage.get(StorageKeys.Scripts)) ?? [];
};

export { getScripts };
