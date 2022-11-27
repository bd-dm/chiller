import { ActionDynamicParam } from "@/common";

type ChangeHandler<ParamType extends ActionDynamicParam = ActionDynamicParam> =
	<Key extends keyof ParamType>(
		key: Key
	) => (value: ParamType[Key] | null) => void;

interface InputExactTypeProps<
	ParamType extends ActionDynamicParam = ActionDynamicParam
> {
	param: ParamType;
	onChange: ChangeHandler<ParamType>;
}

export type { ChangeHandler, InputExactTypeProps };
