import { Script } from "./types";
import { storage, StorageKeys } from "../storage";

const removeScript = async (scriptId: Script["id"]): Promise<void> => {
	await storage.removeItem(StorageKeys.Scripts, ({ id }) => id === scriptId);
};

export { removeScript };
