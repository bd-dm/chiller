import {
	UserEventAction,
	UserEventParams,
	UserEventVariables,
} from "common/user-events";

interface ScriptData {
	id: string;
	name: string;
	body: string;
	addedTimestamp: number;
}

interface ScriptBody {
	version?: number;
	variables: ScriptVariables;
	steps: ScriptSteps;
}

interface ScriptStep<
	UserEventActionType extends UserEventAction = UserEventAction
> {
	id: string;
	action: UserEventActionType;
	params: UserEventParams<UserEventActionType>;
}
type ScriptSteps = ScriptStep[];

type ScriptVariables = UserEventVariables;

export type { ScriptBody, ScriptData, ScriptStep, ScriptVariables };
