import { Row, Select, SelectOption } from "common/components";
import { PressKeyType } from "common/user-events/events";
import { Component } from "solid-js";

import { ConstructorParamsInputProps } from "../../../../types";

interface TypeOption extends SelectOption {
	name: string;
	value: PressKeyType;
}

const typeOptions: TypeOption[] = [
	{ name: "Key down", value: PressKeyType.KeyDown },
	{ name: "Key up", value: PressKeyType.KeyUp },
];

const ParamsInputPressKey: Component<
	ConstructorParamsInputProps<"pressKey">
> = (props) => {
	return (
		<Row>
			<Select
				placeholder={"Type"}
				options={typeOptions}
				initialValue={props.params?.type}
				onChange={(value) => props.onChange({ ...props.params, type: value })}
			/>
			<input
				type="text"
				placeholder={"Key code"}
				maxLength={3}
				value={props.params?.keyCode ?? ""}
				onInput={({ currentTarget: { value } }) =>
					props.onChange({
						...props.params,
						keyCode: parseInt(value, 10),
					})
				}
			/>
		</Row>
	);
};

export { ParamsInputPressKey };
