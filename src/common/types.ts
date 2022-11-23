import { UserEventAction, UserEventParams } from "./user-events";

interface ScriptStep<
	UserEventActionType extends UserEventAction = UserEventAction
> {
	action: UserEventActionType;
	params: UserEventParams<UserEventActionType>;
}

type ScriptVariables = Record<string, string>;

interface ScriptBody {
	variables: ScriptVariables;
	steps: ScriptStep[];
}

export type { ScriptBody, ScriptStep, ScriptVariables };
