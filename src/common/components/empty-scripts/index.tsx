import { Component } from "solid-js";
import { Row } from "../row";

const EmptyScripts: Component = () => (
	<Row horizontalAlignment={Row.Alignment.Horizontal.Center}>
		No scripts yet
	</Row>
);

export { EmptyScripts };
