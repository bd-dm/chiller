import { nanoid } from "nanoid";
import { Component, createSignal, Index, Show } from "solid-js";

import {
	Button,
	Column,
	Icon,
	IconName,
	Illustration,
	Row,
} from "../../../components";
import { IllustrationName } from "../../../components/illustration/constants";
import { addScript, ScriptData } from "../../../scripts";
import { migrateScript } from "../../../scripts/migrate/migrate-script";
import { useControlPanelContext } from "../../context";
import { Page } from "../../enums";
import { FileItem } from "./file-item";
import styles from "./index.module.scss";
import { ImportItem } from "./types";
import { getScriptNameFromFile } from "./utils";

const ScriptImport: Component = () => {
	const { updateScripts, setPage } = useControlPanelContext();
	const [inputRef, setInputRef] = createSignal<HTMLInputElement>();
	const [items, setItems] = createSignal<ImportItem[]>([]);

	const fileAddHandler = async (e: InputEvent) => {
		e.preventDefault();

		const fileList = inputRef()?.files;
		const newFiles: File[] = fileList ? [...fileList] : [];

		const importItems: ImportItem[] = await Promise.all(
			newFiles.map(async (newFile) => ({
				content: await newFile.text(),
				name: await getScriptNameFromFile(newFile),
			})),
		);

		setItems((prevItems) => [...prevItems, ...importItems]);
	};

	const fileRemoveHandler = (index: number) => () => {
		setItems((prevItems) => {
			const newItems = [...prevItems];
			newItems.splice(index, 1);
			return newItems;
		});
	};

	const fileNameChangeHandler = (index: number) => (name: string) => {
		setItems((prevItems) => {
			const newItems = [...prevItems];
			newItems[index].name = name;
			return newItems;
		});
	};

	const importHandler = async () => {
		const scripts: ScriptData[] = items().map((item) => {
			const scriptText = item.content;
			const { body } = JSON.parse(scriptText) as Pick<ScriptData, "body">;

			return {
				id: nanoid(),
				body,
				name: item.name,
				addedTimestamp: new Date().getTime(),
			};
		});

		const migratedScripts = await Promise.all(scripts.map(migrateScript));

		for (let i = 0; i < migratedScripts.length; i++) {
			await addScript(migratedScripts[i]);
		}
		setPage(Page.ScriptList);
		updateScripts();
	};

	return (
		<Column
			classList={{ [styles.page]: true }}
			horizontalAlignment={Column.Alignment.Horizontal.Stretch}
		>
			<Show when={items().length === 0}>
				<Column horizontalAlignment={Column.Alignment.Horizontal.Center}>
					<Illustration name={IllustrationName.Import} />
					<Row horizontalAlignment={Row.Alignment.Horizontal.Center}>
						<h3>Add *.json files here to import scripts</h3>
					</Row>
				</Column>
			</Show>
			<Show when={items().length > 0}>
				<ul class={styles.list}>
					<Index each={items()}>
						{(item, index) => (
							<FileItem
								item={item()}
								fileNameChangeHandler={fileNameChangeHandler(index)}
								fileRemoveHandler={fileRemoveHandler(index)}
							/>
						)}
					</Index>
				</ul>
			</Show>
			<div class={styles.input}>
				<input
					ref={setInputRef}
					type="file"
					onInput={fileAddHandler}
					accept={"application/json"}
					multiple
				/>
				<Button classList={{ [styles.button]: true }} light>
					<Icon name={IconName.Add} />
					&nbsp; Add file(s)
				</Button>
			</div>
			<Show when={items().length > 0}>
				<Button classList={{ [styles.button]: true }} onClick={importHandler}>
					Import
				</Button>
			</Show>
		</Column>
	);
};

export { ScriptImport };
