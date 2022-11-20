import { UserEventAction, UserEventParams } from "./user-events";

interface ScriptStep<
	UserEventActionType extends UserEventAction = UserEventAction
> {
	action: UserEventActionType;
	params: UserEventParams<UserEventActionType>;
}

interface ScriptBody {
	steps: ScriptStep[];
}

export type { ScriptBody };
