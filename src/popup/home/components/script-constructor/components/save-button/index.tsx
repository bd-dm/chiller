import { Component } from "solid-js";
import { useScriptConstructor } from "../../context";

const SaveButton: Component = () => {
	const { save } = useScriptConstructor();

	return (
		<button type={"button"} onClick={save}>
			Save
		</button>
	);
};

export { SaveButton };
