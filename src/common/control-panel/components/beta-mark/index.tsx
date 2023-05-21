import { Component } from "solid-js";

import styles from "./index.module.scss";

const BetaMark: Component = () => {
	return (
		<div class={styles.beta}>
			Beta{" "}
			<div class={styles.betaLink}>
				Welcome to contribute on{" "}
				<a target={"_blank"} href="https://github.com/bd-dm/chiller">
					Github
				</a>
			</div>
		</div>
	);
};

export { BetaMark };
