import { Input } from "common/components";
import { Component } from "solid-js";

import { useScriptConstructor } from "../../context";

const NameInput: Component = () => {
	const { name, setName } = useScriptConstructor();

	return (
		<Input
			type="text"
			placeholder={"Name"}
			value={name()}
			onInput={({ currentTarget: { value } }) => setName(value)}
		/>
	);
};

export { NameInput };
