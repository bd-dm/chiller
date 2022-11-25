import { UserEventAction, UserEventOptions } from "./user-events";

interface ScriptStep<
	UserEventActionType extends UserEventAction = UserEventAction
> {
	action: UserEventActionType;
	params: UserEventOptions<UserEventActionType>;
}

type ScriptVariables = Record<string, string>;

interface ScriptBody {
	variables: ScriptVariables;
	steps: ScriptStep[];
}

export type { ScriptBody, ScriptStep, ScriptVariables };
