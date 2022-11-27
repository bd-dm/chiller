import { Button } from "common/components";
import { Component } from "solid-js";

import { useScriptConstructor } from "../../context";

const SaveButton: Component = () => {
	const { save } = useScriptConstructor();

	return (
		<Button type={"button"} onClick={save}>
			Save
		</Button>
	);
};

export { SaveButton };
