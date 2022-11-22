import { ParentComponent } from "solid-js/types/render/component";
import { Column } from "../../../../../../common/components";

const BodyConstructorSection: ParentComponent = (props) => {
	return (
		<Column>
			<div>section</div>
			<div>{props.children}</div>
		</Column>
	);
};

export { BodyConstructorSection };
