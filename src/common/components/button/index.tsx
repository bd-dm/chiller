import { ParentComponent } from "solid-js/types/render/component";
import { JSX } from "solid-js";
import commonStyles from "../../styles/index.module.scss";

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
