import { storage, StorageKeys } from "common/storage";

import { ScriptData } from "./types";

const getScripts = async (): Promise<ScriptData[]> => {
	console.log(await storage.get(StorageKeys.Scripts));
	return (await storage.get(StorageKeys.Scripts)) ?? [];
};

export { getScripts };
