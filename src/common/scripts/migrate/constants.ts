import { migrateV1ToV2 } from "./migrators";
import { MigrationUtils } from "./types";

const MIGRATION_UTILS: MigrationUtils = {
	2: migrateV1ToV2,
};

export { MIGRATION_UTILS };
