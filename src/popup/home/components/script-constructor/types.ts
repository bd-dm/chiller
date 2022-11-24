import { Script } from "../../../../common/scripts/types";
import { ScriptStep } from "../../../../common/types";
import { UserEventAction } from "../../../../common/user-events";

interface ScriptConstructorProps {
	scriptId?: Script["id"];
	onResult?: (result: Script) => void;
}

interface VariableInputItem {
	name: string;
	value: string;
}

type StepInputItem<ActionType extends UserEventAction = UserEventAction> =
	Partial<ScriptStep<ActionType>>;

export type { ScriptConstructorProps, VariableInputItem, StepInputItem };
