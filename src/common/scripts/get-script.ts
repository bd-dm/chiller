import { Script } from "./types";
import { getScripts } from "./get-scripts";
import { isUndefined } from "lodash-es";

const getScript = async (scriptId: Script["id"]): Promise<Script> => {
	const scripts = await getScripts();
	const script = scripts.find((script) => script.id === scriptId);

	if (isUndefined(script)) {
		throw new Error("Script with id=" + scriptId + " not found");
	}

	return script;
};

export { getScript };
