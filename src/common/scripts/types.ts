import {
	UserEventAction,
	UserEventParams,
	UserEventVariables,
} from "common/user-events";

interface ScriptData {
	id: string;
	name: string;
	json: string;
	addedTimestamp: number;
}

interface ScriptBody {
	variables: ScriptVariables;
	steps: ScriptSteps;
}

interface ScriptStep<
	UserEventActionType extends UserEventAction = UserEventAction
> {
	action: UserEventActionType;
	params: UserEventParams<UserEventActionType>;
}
type ScriptSteps = ScriptStep[];

type ScriptVariables = UserEventVariables;

export type { ScriptBody, ScriptData, ScriptStep, ScriptVariables };
