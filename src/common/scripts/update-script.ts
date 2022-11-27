import { storage, StorageKeys } from "@/common/storage";

import { ScriptData } from "./types";

const updateScript = async (script: ScriptData): Promise<void> => {
	await storage.updateItem(
		StorageKeys.Scripts,
		({ id }) => id === script.id,
		script
	);
};

export { updateScript };
