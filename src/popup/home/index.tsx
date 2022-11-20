import { Component } from "solid-js";
import { ButtonsRow, Scripts } from "./components";
import { HomeContext } from "./context";
import styles from "./index.module.scss";
import commonStyles from "../../common/styles/index.module.scss";

const Home: Component = () => {
	return (
		<HomeContext.Provider>
			<div classList={{ [styles.popup]: true, [commonStyles.chiller]: true }}>
				<ButtonsRow />
				<Scripts />
			</div>
		</HomeContext.Provider>
	);
};

export { Home };
