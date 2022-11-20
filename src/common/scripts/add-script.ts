import { Script } from "./types";
import { StorageKeys } from "../enums";
import { getScripts } from "./get-scripts";

const addScript = async (script: Script): Promise<void> => {
	const prevScripts = await getScripts();
	await chrome.storage.local.set({
		[StorageKeys.Scripts]: [...prevScripts, script],
	});
};

export { addScript };
