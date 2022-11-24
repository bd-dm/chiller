import { Component } from "solid-js";
import { StepInputItem } from "../../../../types";

interface ParamsInputProps {
	action: StepInputItem["action"];
	initialValue?: StepInputItem["params"];
}

const ParamsInput: Component<ParamsInputProps> = (props) => {
	return <p>params for {props.action}</p>;
};

export { ParamsInput };
