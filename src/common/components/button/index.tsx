import { JSX, ParentComponent } from "solid-js";

import styles from "./index.module.scss";

interface ButtonProps
	extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "class"> {
	notStyled?: boolean;
	light?: boolean;
	active?: boolean;
}

const Button: ParentComponent<ButtonProps> = (props) => {
	const classList = () => ({
		...(props.classList ?? {}),
		[styles.button]: !props.notStyled,
		[styles.light]: props.light,
		[styles.active]: props.active,
	});

	return (
		<button {...props} classList={classList()}>
			{props.children}
		</button>
	);
};

export { Button };
