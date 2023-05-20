import { Button, Column } from "common/components";
import { Component } from "solid-js";

import { useScriptConstructor } from "../../context";

interface FinishButtonsProps {
	cancelText: string;
	saveText: string;
}

const FinishButtons: Component<FinishButtonsProps> = (props) => {
	const { save, cancel } = useScriptConstructor();

	return (
		<Column horizontalAlignment={Column.Alignment.Horizontal.Stretch}>
			<Button type={"button"} onClick={save} aria-label={"Save"}>
				{props.saveText}
			</Button>
			<Button light type={"button"} onClick={cancel} aria-label={"Cancel"}>
				{props.cancelText}
			</Button>
		</Column>
	);
};

export { FinishButtons };
