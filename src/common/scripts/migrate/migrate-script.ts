import { isUndefined } from "lodash-es";

import {
	DEFAULT_SCRIPT_SCHEMA_VERSION,
	SCRIPT_SCHEMA_VERSION,
} from "../constants";
import { getScriptBody } from "../get-script-body";
import { ScriptData } from "../types";
import { MIGRATION_UTILS } from "./constants";

const migrateScript = async (script: ScriptData): Promise<ScriptData> => {
	const { version = DEFAULT_SCRIPT_SCHEMA_VERSION } = getScriptBody(script);

	const nextMigrationUtil = MIGRATION_UTILS[version + 1];
	const isMigrationNeeded =
		version < SCRIPT_SCHEMA_VERSION && !isUndefined(nextMigrationUtil);

	if (isMigrationNeeded) {
		const nextVersionScript = nextMigrationUtil(script);
		return await migrateScript(nextVersionScript);
	} else {
		// Save script as is, because it's already migrated or no need to migrate
		return script;
	}
};

export { migrateScript };
