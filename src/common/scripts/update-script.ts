import { Script } from "./types";
import { StorageKeys } from "../storage";
import { storage } from "../storage";

const updateScript = async (script: Script): Promise<void> => {
	await storage.updateItem(
		StorageKeys.Scripts,
		({ id }) => id === script.id,
		script
	);
};

export { updateScript };
