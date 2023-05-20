import { ScriptData } from "../types";

type MigrationUtils = Record<number, (script: ScriptData) => ScriptData>;

export type { MigrationUtils };
