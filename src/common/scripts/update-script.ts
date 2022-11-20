import { Script } from "./types";
import { StorageKeys } from "../enums";
import { getScripts } from "./get-scripts";

const updateScript = async (script: Script): Promise<void> => {
	const prevScripts = await getScripts();
	const targetIdx = prevScripts.findIndex(
		(prevScript) => prevScript.id !== script.id
	);
	prevScripts[targetIdx] = script;

	await chrome.storage.local.set({
		[StorageKeys.Scripts]: prevScripts,
	});
};

export { updateScript };
