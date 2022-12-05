import { Select, SelectOption } from "common/components";
import { Keys } from "common/user-events/events";
import { enumValues } from "common/utils";
import { toNumber } from "lodash-es";
import { Component } from "solid-js";

import { ConstructorParamsInputProps } from "../../../../types";

interface TypeOption extends SelectOption {
	name: string;
	value: string;
}

const keyOptions: TypeOption[] = enumValues(Keys).map((keyCode) => ({
	name: Keys[keyCode],
	value: keyCode.toString(),
}));

const ParamsInputPressKey: Component<
	ConstructorParamsInputProps<"pressKey">
> = (props) => {
	return (
		<Select
			placeholder={"Key"}
			options={keyOptions}
			initialValue={props.params?.key?.toString()}
			onChange={(value) =>
				props.onChange({ ...props.params, key: toNumber(value) })
			}
		/>
	);
};

export { ParamsInputPressKey };
