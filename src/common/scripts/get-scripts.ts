import { storage, StorageKeys } from "common/storage";

import { ScriptData } from "./types";

const getScripts = async (): Promise<ScriptData[]> => {
	return (await storage.get(StorageKeys.Scripts)) ?? [];
};

export { getScripts };
