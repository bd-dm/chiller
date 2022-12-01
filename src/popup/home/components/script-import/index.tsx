import { Component, createSignal, For } from "solid-js";

import { Button, Column, Row } from "../../../../common/components";
import styles from "./index.module.scss";

const ScriptImport: Component = () => {
	const [inputRef, setInputRef] = createSignal<HTMLInputElement>();
	const [files, setFiles] = createSignal<File[]>([]);

	const fileAddHandler = (e: InputEvent) => {
		e.preventDefault();
		const fileList = inputRef()?.files;
		const newFiles: File[] = fileList ? [...fileList] : [];

		setFiles((prevFiles) => [...prevFiles, ...newFiles]);
	};

	return (
		<Column
			classList={{ [styles.page]: true }}
			horizontalAlignment={Column.Alignment.Horizontal.Stretch}
		>
			<ul class={styles.list}>
				<For each={files()} fallback={<p>No files selected</p>}>
					{(file) => (
						<li class={styles.item}>
							<Row verticalAlignment={Row.Alignment.Vertical.Center}>
								<span class={styles.itemName}>{file.name}</span>
								<Button>&times;</Button>
							</Row>
						</li>
					)}
				</For>
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
		</Column>
	);
};

export { ScriptImport };
