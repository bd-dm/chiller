import { JSX, ParentComponent } from "solid-js";

import styles from "./index.module.scss";

interface ButtonProps
	extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "class"> {
	notStyled?: boolean;
}

const Button: ParentComponent<ButtonProps> = (props) => {
	const classList = () => ({
		...(props.classList ?? {}),
		[styles.button]: !props.notStyled,
	});

	return (
		<button {...props} classList={classList()}>
			{props.children}
		</button>
	);
};

export { Button };
