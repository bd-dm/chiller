import { Script } from "./types";
import { StorageKeys } from "../enums";
import { getScripts } from "./get-scripts";

const removeScript = async (scriptId: Script["id"]): Promise<void> => {
	const prevScripts = await getScripts();
	await chrome.storage.local.set({
		[StorageKeys.Scripts]: prevScripts.filter(
			(prevScript) => prevScript.id !== scriptId
		),
	});
};

export { removeScript };
