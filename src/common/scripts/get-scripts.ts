import { Script } from "./types";
import { storage, StorageKeys } from "../storage";

const getScripts = async (): Promise<Script[]> => {
	return (await storage.get(StorageKeys.Scripts)) ?? [];
};

export { getScripts };
