import { ActionParam } from "../../../../../../../../common/user-events/types";

type ChangeHandler<ParamType extends ActionParam = ActionParam> = <
	Key extends keyof ParamType
>(
	key: Key
) => (value: ParamType[Key] | null) => void;

interface InputExactTypeProps<ParamType extends ActionParam = ActionParam> {
	param: ParamType;
	onChange: ChangeHandler<ParamType>;
}

export type { ChangeHandler, InputExactTypeProps };
