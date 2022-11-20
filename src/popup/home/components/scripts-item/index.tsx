import { Component } from "solid-js";
import styles from "../scripts-list/index.module.scss";
import { Script } from "../../../../common/scripts/types";

interface ScriptsItemProps {
	script: Script;
}

const ScriptsItem: Component<ScriptsItemProps> = (props) => {
	return <li class={styles.item}>{props.script.name}</li>;
};

export { ScriptsItem };
