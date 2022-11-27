import { storage, StorageKeys } from "common/storage";
import { isEmpty, isNull } from "lodash-es";

import { ScriptData } from "./types";

const saveScriptDraft = async (script: ScriptData): Promise<void> => {
	const isInvalidDraft = isEmpty(script.id);

	if (isInvalidDraft) {
		return;
	}

	const findFn = ({ id }: ScriptData) => id === script.id;

	const previousItem = await storage.getItem(StorageKeys.ScriptDrafts, findFn);

	if (!isNull(previousItem)) {
		await storage.removeItem(StorageKeys.ScriptDrafts, findFn);
	}

	await storage.addItem(StorageKeys.ScriptDrafts, script);
};

export { saveScriptDraft };
