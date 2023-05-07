import { Component } from "solid-js";

import { Button, Icon, IconName, Input, Row } from "../../../components";
import styles from "./index.module.scss";
import { ImportItem } from "./types";

interface ItemProps {
	item: ImportItem;
	fileRemoveHandler: () => void;
	fileNameChangeHandler: (value: string) => void;
}

const FileItem: Component<ItemProps> = (props) => {
	return (
		<li class={styles.item}>
			<Row verticalAlignment={Row.Alignment.Vertical.Center}>
				<Input
					placeholder={"Script name"}
					value={props.item.name}
					onInput={({ currentTarget: { value } }) =>
						props.fileNameChangeHandler(value)
					}
				/>
				<Button light onClick={() => props.fileRemoveHandler()}>
					<Icon name={IconName.Close} />
				</Button>
			</Row>
		</li>
	);
};

export { FileItem };
