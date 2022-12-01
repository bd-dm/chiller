import { Component, JSX } from "solid-js";

import styles from "./index.module.scss";

const InputLight: Component<JSX.InputHTMLAttributes<HTMLInputElement>> = (
	props
) => {
	return (
		<input
			{...props}
			classList={{
				...props.classList,
				[styles.input]: true,
			}}
		/>
	);
};

export { InputLight };
