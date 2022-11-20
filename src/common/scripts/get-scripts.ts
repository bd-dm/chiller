import { Script } from "./types";
import { StorageKeys } from "../enums";

const getScripts = async (): Promise<Script[]> => {
	const storage = await chrome.storage.local.get(StorageKeys.Scripts);
	return storage[StorageKeys.Scripts] ?? [];
};

export { getScripts };
