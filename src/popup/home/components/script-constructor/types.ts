import { Script } from "../../../../common/scripts/types";

interface ScriptConstructorProps {
	scriptId?: Script["id"];
	onResult?: (result: Script) => void;
}

export type { ScriptConstructorProps };
