import { nanoid } from "nanoid";
import { Component, createSignal, Index, Show } from "solid-js";

import { Button, Column } from "../../../../common/components";
import { addScript, ScriptData } from "../../../../common/scripts";
import { useHomeContext } from "../../context";
import { Page } from "../../enums";
import { FileItem } from "./file-item";
import styles from "./index.module.scss";
import { ImportItem } from "./types";
import { getScriptNameFromFile } from "./utils";

const ScriptImport: Component = () => {
	const { updateScripts, setPage } = useHomeContext();
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
			}))
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

		for (let i = 0; i < scripts.length; i++) {
			await addScript(scripts[i]);
		}
		setPage(Page.ScriptList);
		updateScripts();
	};

	return (
		<Column
			classList={{ [styles.page]: true }}
			horizontalAlignment={Column.Alignment.Horizontal.Stretch}
		>
			<ul class={styles.list}>
				<Index
					each={items()}
					fallback={
						<li class={styles.noItems}>
							Add *.json files here to import scripts
						</li>
					}
				>
					{(item, index) => (
						<FileItem
							item={item()}
							fileNameChangeHandler={fileNameChangeHandler(index)}
							fileRemoveHandler={fileRemoveHandler(index)}
						/>
					)}
				</Index>
			</ul>
			<div class={styles.input}>
				<input
					ref={setInputRef}
					type="file"
					onInput={fileAddHandler}
					accept={"application/json"}
					multiple
				/>
				<Button classList={{ [styles.button]: true }} light>
					+ Add file(s)
				</Button>
			</div>
			<Show when={items().length > 0} keyed>
				<Button classList={{ [styles.button]: true }} onClick={importHandler}>
					Import
				</Button>
			</Show>
		</Column>
	);
};

export { ScriptImport };
