import { ActionTargetType } from "./enums";
import { UseVariable } from "../types";

interface ActionTargetBase {
	type?: ActionTargetType;
}

interface SelectorActionTarget extends ActionTargetBase {
	type?: ActionTargetType.Selector;
	selector: string;
}

interface VariableActionTarget extends ActionTargetBase, UseVariable {
	type?: ActionTargetType.Variable;
}

type ActionTarget = SelectorActionTarget | VariableActionTarget;

interface ElementData<ElementType extends HTMLElement> {
	element: ElementType;
	iframe?: HTMLIFrameElement;
}

export type {
	ActionTarget,
	ElementData,
	SelectorActionTarget,
	VariableActionTarget,
};
