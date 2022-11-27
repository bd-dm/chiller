import commonStyles from "common/styles/index.module.scss";
import { JSX, ParentComponent } from "solid-js";

interface ButtonProps
	extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "class"> {
	notStyled?: boolean;
}

const Button: ParentComponent<ButtonProps> = (props) => {
	const classList = () => ({
		...(props.classList ?? {}),
		[commonStyles.button]: !props.notStyled,
	});

	return (
		<button {...props} classList={classList()}>
			{props.children}
		</button>
	);
};

export { Button };
