import { EmptyScripts } from "common/components";
import { For } from "solid-js";

import { useCoreContext } from "../../../context";
import { ScriptsItem } from "../scripts-item";
import styles from "./index.module.scss";

const ScriptsList = () => {
	const { scripts } = useCoreContext();

	return (
		<ul class={styles.list}>
			<For
				each={scripts()}
				fallback={
					<EmptyScripts
						compact
						message={
							<>
								No scripts added yet. <br /> Please add them using extension
								menu
							</>
						}
					/>
				}
			>
				{(script) => <ScriptsItem script={script} />}
			</For>
		</ul>
	);
};

export { ScriptsList };
