import { Button, Column } from "common/components";
import { Component } from "solid-js";

import { useScriptConstructor } from "../../context";

const SaveButton: Component = () => {
	const { save, cancel } = useScriptConstructor();

	return (
		<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
			<Button type={"button"} onClick={save}>
				Save
			</Button>
			<Button light type={"button"} onClick={cancel}>
				Cancel
			</Button>
		</Column>
	);
};

export { SaveButton };
