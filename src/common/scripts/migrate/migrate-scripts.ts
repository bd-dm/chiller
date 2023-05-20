import { isEmpty } from "lodash-es";

import { getScripts } from "../get-scripts";
import { updateScript } from "../update-script";
import { migrateScript } from "./migrate-script";

const migrateScripts = async (): Promise<void> => {
	const scripts = await getScripts();
	if (isEmpty(scripts)) {
		return;
	}

	const newScripts = await Promise.all(scripts.map(migrateScript));
	await Promise.all(newScripts.map((script) => updateScript(script)));
};

export { migrateScripts };
